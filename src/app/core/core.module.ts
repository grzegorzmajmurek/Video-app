import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ContentComponent } from './components/content/content.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { AppMaterialModule } from './app-material.module';
import { ApiService } from './services/api.service';
import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    HomeComponent,
    ContentComponent,
    
  ],
  
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AppMaterialModule
  ],
  providers: [
    ApiService,
    MoviesService
  ],
  bootstrap: [HomeComponent]
})
export class CoreModule { }