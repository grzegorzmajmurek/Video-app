import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from '../content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from '../shared-components/search-input/search-input.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '../shared-components/button/button.component';
import { DialogComponent } from '../shared-components/dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoviesService } from '../services/movies.service';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SearchInputComponent,
    ButtonComponent,
    DialogComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [
    ApiService,
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
