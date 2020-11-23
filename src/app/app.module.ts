import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ContentComponent } from '../content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from '../shared-components/search-input/search-input.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from '../shared-components/button/button.component';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SearchInputComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
