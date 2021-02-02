import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ContentComponent} from '../content/content.component';
import {HttpClientModule} from '@angular/common/http';
import {SearchInputComponent} from '@shared-components/search-input/search-input.component';
import {AppMaterialModule} from './app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonComponent} from '@shared-components/button/button.component';
import {DialogComponent} from '@shared-components/dialog/dialog.component';
import {ApiService} from '@services/api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MoviesService} from '@services/movies.service';
import {ListItemComponent} from '@shared-components/list-item/list-item.component';
import {CheckBoxComponent} from '@shared-components/check-box/check-box.component';
import {PaginatorComponent} from '@shared-components/paginator/paginator.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '@environments/environment';
import {MovieEffects} from '../store/movie/movie.effects';
import * as movieReducer from '../store/movie/movie.reducer';
import * as uiReducer from '../store/ui/ui.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    SearchInputComponent,
    ButtonComponent,
    DialogComponent,
    ListItemComponent,
    CheckBoxComponent,
    PaginatorComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    StoreModule.forRoot({data: movieReducer.reducer, ui: uiReducer.reducer}),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [
    ApiService,
    MoviesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
