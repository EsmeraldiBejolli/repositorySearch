import {Component} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {RepositoryDetailsService} from '../repositorydetails.service';
import { LocalStorageService } from 'angular-2-local-storage';
import {RepositoryModel} from './repository.model';


import 'rxjs/add/operator/map';


@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})

export class RepositoryComponent {

  constructor(private router: Router, private repository: RepositoryDetailsService, private localStorageService: LocalStorageService) {
    this.initialize();
  }
  title: any;
  view = [780, 400];
  // options
  data: [any] = null;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Contributors';
  showYAxisLabel = true;
  yAxisLabel = 'Contributes';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

 initialize() {
   this.router.events
     .filter(event => event instanceof NavigationEnd)
     .subscribe((event: NavigationEnd) => {
       let url = this.localStorageService.get('api_url');
       this.getContributors(url);
       this.title = this.localStorageService.get('repository_name');
     });
 }

  getContributors(url) {
    return this.repository.searchRepo(url).then(res => {
     this.data = res.map(({login, contributions}) => new RepositoryModel(login, contributions));
     if ( this.data ===  []) {
       this.router.navigate(['notfound']);
     }
    });
  }
}
