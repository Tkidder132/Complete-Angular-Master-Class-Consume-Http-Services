import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs';

@Injectable()
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
  }

  getAllPosts() {
    return this.http.get(this.url).catch(this.handleError);                    
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post)).catch(this.handleError);
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true })).catch(this.handleError);
  }

  deletePost(id) {
    return this.http.delete(this.url + '/' + id).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    try {
      if(error.json().length >= 1) {
        return Observable.throw(error.json());
      }
    } catch(e) {
      return Observable.throw(error.json().error || 'Oops! Something went wrong trying to talk to the server!');
    }
  }

}
