import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {ApiService} from '@services/api.service';
import {
  FETCH_MOVIE_FROM_VIMEO,
  FETCH_MOVIE_FROM_YOUTUBE,
  FetchMovieFromVimeo,
  FetchMovieFromYoutube, VimeoMovieLoadedSucces,
  YoutubeMovieLoadedSuccess
} from './movie.actions';
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
          if (!action || res.items.length === 0) {
            return new AddAlert('Podałeś niepoprawny link do YouTube');
          }
          return new YoutubeMovieLoadedSuccess(res);
        })
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType<FetchMovieFromVimeo>(FETCH_MOVIE_FROM_VIMEO),
    mergeMap(action => this.apiService.fetchVimeoApi(action.id)
      .pipe(
        map(res => {
          if (action) {
            return new VimeoMovieLoadedSucces(res, action.id);
          } else {
            return new AddAlert('Podałeś niepoprawny link do Vimeo');
          }
        })
      ))
  ));
}
