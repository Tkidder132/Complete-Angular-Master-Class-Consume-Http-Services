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
    this.postService.getAll().subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };
    input.value = '';
    this.postService.create(post).subscribe(posts => this.posts = posts);
  }

  updatePost(post) {
    this.postService.update(post).subscribe(posts => this.posts = posts);
  }

  deletePost(post) {
    this.postService.delete(post.id).subscribe(posts => this.posts = posts);
  }
}
