import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  model: any;
  data:any;
  searching = false;
  searchFailed = false;
  noResultsFound = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
   constructor(private searchService: SearchService, private router: Router, private localStorageService: LocalStorageService) { }
  formatMatches = (value: any) => value.name || '';
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term => term.length < 3 || term === '' ? []
       : this.searchService.searchRepo(term)
          .do(() => {
          this.searchFailed = false;
            this.searchService.searchRepo(term).subscribe(v => this.data = v);
            (!this.data.left) ? this.noResultsFound = true : this.noResultsFound = false;
        })
          .catch(() => {
            this.searchFailed = true;
            return Observable.of([]);
          }))
      .do(() => this.searching = false)
      .merge(this.hideSearchingWhenUnsubscribed)

  ngOnInit() {
  }

  onSelectTypeahead(item) {
    this.router.navigate(['repository', item.full_name]);
    this.localStorageService.set('api_url', item['contributors_url']);
    this.localStorageService.set('repository_name', item['full_name']);
  }

}
