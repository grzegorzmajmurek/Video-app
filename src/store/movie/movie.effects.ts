import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {ApiService} from '@services/api.service';
import {
  vimeoMovieLoadedSucces,
  youtubeMovieLoadedSuccess
} from './movie.actions';
import {addAlert} from '../ui/ui.actions';

@Injectable()
export class MovieEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  loadYoutubeMovie$ = createEffect(() => this.actions$.pipe(
    ofType('[MOVIE] FETCH_MOVIE_FROM_YOUTUBE'),
    mergeMap(({id}) => this.apiService.fetchYoutubeApi(id)
      .pipe(
        map(res => {
          if (!id || res.items.length === 0) {
            return addAlert({text: 'Podałeś niepoprawny link do YouTube'});
          }
          return youtubeMovieLoadedSuccess({res});
        })
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType('[MOVIE] FETCH_MOVIE_FROM_VIMEO'),
    mergeMap(({id}) => this.apiService.fetchVimeoApi(id)
      .pipe(
        map(res => {
          if (id) {
            return vimeoMovieLoadedSucces({res, id});
          } else {
            return addAlert({text: 'Podałeś niepoprawny link do Vimeo'});
          }
        })
      ))
  ));
}
