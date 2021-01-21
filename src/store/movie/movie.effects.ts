import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {ApiService} from '@services/api.service';
import {
  FETCH_MOVIE_FROM_VIMEO,
  FETCH_MOVIE_FROM_YOUTUBE,
  FetchMovieFromVimeo,
  FetchMovieFromYoutube, VimeoMovieLoadedSucces,
  YoutubeMovieLoadedSucces
} from './movie.actions';
import {of} from 'rxjs';
import {AddAlert} from '../ui/ui.actions';

@Injectable()
export class MovieEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  loadYoutubeMovie$ = createEffect(() => this.actions$.pipe(
    ofType<FetchMovieFromYoutube>(FETCH_MOVIE_FROM_YOUTUBE),
    mergeMap(action => this.apiService.fetchYoutubeApi(action.id)
      .pipe(
        map(res => {
          if (res.items.length === 0) {
            return;
          }
          return new YoutubeMovieLoadedSucces(res);
        }),
        catchError(err => {
          return of(new AddAlert('Podałeś niepoprawny link do YouTube'));
        })
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType<FetchMovieFromVimeo>(FETCH_MOVIE_FROM_VIMEO),
    mergeMap(action => this.apiService.fetchVimeoApi(action.id)
      .pipe(
        map(res => new VimeoMovieLoadedSucces(res, action.id)),
        catchError(err => {
          return of(new AddAlert('Podałeś niepoprawny link do Vimeo'));
        })
      ))
  ));
}
