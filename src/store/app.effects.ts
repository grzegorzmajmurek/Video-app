import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ApiService} from '@services/api.service';
import {FetchMovieFromVimeo, FetchMovieFromYoutube, VimeoMovieLoadedSucces, YoutubeMovieLoadedSucces} from './app.action';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  loadYoutubeMovie$ = createEffect(() => this.actions$.pipe(
    ofType<FetchMovieFromYoutube>('FETCH_MOVIE_FROM_YOUTUBE'),
    mergeMap(action => this.apiService.fetchYoutubeApi(action.id)
      .pipe(
        map(res => new YoutubeMovieLoadedSucces(res))
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType<FetchMovieFromVimeo>('FETCH_MOVIE_FROM_VIMEO'),
    mergeMap(action => this.apiService.fetchVimeoApi(action.id)
      .pipe(
        map(res => new VimeoMovieLoadedSucces(res))
      ))
  ));
}
