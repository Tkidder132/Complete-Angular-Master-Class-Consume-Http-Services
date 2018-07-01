import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {

  }

  ngOnInit() {
    this.postService.getAllPosts()
        .subscribe(response => {
          this.posts = response.json();
        }, error => {
          alert('An unexpected error occurred.');
          console.log(error);
        });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.postService.createPost(post)
        .subscribe(response => {
          this.posts = response.json();
        }, error => {
          alert('An unexpected error occurred.');
          console.log(error);
        });
  }

  updatePost(post) {
    this.postService.updatePost(post)
        .subscribe(response => {
          this.posts = response.json();
        }, error => {
          alert('An unexpected error occurred.');
          console.log(error);
        });
  }

  deletePost(post) {
    this.postService.deletePost(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      }, error => {
        alert('An unexpected error occurred.');
        console.log(error);
      });
  }

}
