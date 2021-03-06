import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';


@Injectable()
export class SearchService {
  constructor(private http: Http) {}

  searchRepo(term: string) {
    if (term === '') {
      return Observable.of([]);
    }

    let api_url = 'https://api.github.com/search/repositories';
    return this.http.get(`${api_url}?q=${term}`)
      .map((response) => response.json())
      .map(({items}) => items);
  }
}

