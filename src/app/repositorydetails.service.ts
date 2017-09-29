import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';


@Injectable()
export class RepositoryDetailsService {

  constructor(private http: Http) {}

  searchRepo(api_url: string): Promise<any> {
    return this.http
      .get(api_url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(value: Response) {
    return value.json();
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

