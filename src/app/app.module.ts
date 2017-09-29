import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule, Http} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LocalStorageModule } from 'angular-2-local-storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SearchService } from './search.service';
import { HeaderComponent } from './header/header.component';
import { RepositoryComponent } from './repository/repository.component';
import { RepositoryDetailsService } from './repositorydetails.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  {
    path: 'repository/:id',
    component: RepositoryComponent
  },
  {
    path: 'notfound',
    component: NotFoundComponent
  },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RepositoryComponent,
    NotFoundComponent
  ],
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'my-app',
      storageType: 'localStorage'
    }),
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ChartsModule,
    NgxChartsModule,
    HttpModule,
  ],
  providers: [
    SearchService,
    RepositoryDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
