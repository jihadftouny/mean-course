import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: "This is the first post's content" },
  //   { title: 'Second Post', content: "This is the second post's content" },
  //   { title: 'Third Post', content: "This is the third post's content" },
  // ];

  posts: Post[] = [];
  private postsSub: Subscription; //will avoid memory leaks when this component is not part of the display (kills the data)
  // postsService: PostsService; the public keyword in the constructor automatically creates this and stores values on it

  constructor(public postsService: PostsService) {
    //this.postsService = postsService; the public keyword in the constructor automatically creates this and stores values on it
  }

  ngOnInit() {
    this.postsService.getPosts();

    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) =>{
        this.posts = posts;
      });
  }

  //called whenever the component is about to be destroyed
  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
