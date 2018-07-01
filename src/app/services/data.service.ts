import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) {
  }

  getAll() {
    return this.http.get(this.url)
                    .map((response: any) => {
                        return response.json();
                    })
                    .catch(this.handleError);                    
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
                    .map((response: any) => {
                        return response.json();
                    })
                    .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
                    .map((response: any) => {
                        return response.json();
                    })
                    .catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
                    .map((response: any) => {
                        return response.json();
                    })
                    .catch(this.handleError);
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
