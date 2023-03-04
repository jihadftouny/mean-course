import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = []; //we dont want anyone accessing this variable from outside
  private postsUpdated = new Subject<Post[]>(); //we had to use Subject because in the beggining we were pulling a empty array so nothign showed up

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>( //you can be more clear about the type
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        });

      })) //allows operators (?)
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });

    //return [...this.posts]; //Good Practice! This is a ts/new js feature that copies an array, not only its reference
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); //returns an object that can listen but not emit
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      content: content,
    };
    this.http
      .post<{ message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
    // added to subscribe method
    // this.posts.push(post);
    // this.postsUpdated.next([...this.posts]);
  }
  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() =>{
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        //you could just call getPosts, where the null id will be updated, but you'll do something else
      })
  }
}
