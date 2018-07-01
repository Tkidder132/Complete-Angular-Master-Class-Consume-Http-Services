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
    this.postService.getAll()
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
    this.postService.create(post)
        .subscribe(response => {
          this.posts = response.json();
        });
  }

  updatePost(post) {
    this.postService.update(post)
        .subscribe(response => {
          this.posts = response.json();
        });
  }

  deletePost(post) {
    this.postService.delete(post.id)
      .subscribe(response => {
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      });
  }
}
