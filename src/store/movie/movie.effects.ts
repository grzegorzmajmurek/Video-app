import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService } from '@services/api.service';
import {
  fetchMovieFromVimeo,
  fetchMovieFromYoutube,
  vimeoMovieLoadedSuccess,
  youtubeMovieLoadedSuccess
} from './movie.actions';

import { movieLoadedError } from '../ui/ui.actions';

import { VimeoApiResponse, YoutubeApiResponse } from '@model/api-response.model';
import { Movie } from '@model/movies.model';

import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  mapYoutubeResponse(res: YoutubeApiResponse): Movie {
    const {id, snippet, statistics} = res.items[ 0 ];
    return {
      movieId: id,
      imageUrl: snippet.thumbnails.default.url,
      title: snippet.title,
      viewCount: statistics.viewCount,
      publishedAt: snippet.publishedAt,
      url: `https://www.youtube.com/embed/${id}`,
      favorite: false
    };
  }

  mapVimeoResponse(res: VimeoApiResponse, id: string): Movie {
    return {
      movieId: id,
      imageUrl: res.pictures.sizes[ 0 ].link,
      title: res.name,
      viewCount: '',
      publishedAt: res.created_time,
      url: `https://player.vimeo.com/video/${id}`,
      favorite: false
    };
  }

  loadYoutubeMovie$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMovieFromYoutube),
    mergeMap(({id}) => this.apiService.fetchYoutubeApi(id)
      .pipe(
        map(res => {
          return youtubeMovieLoadedSuccess({movie: this.mapYoutubeResponse(res)});
        }),
        catchError((err: any) => {
          return of(movieLoadedError({error: `message: ${err}`}));
        })
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMovieFromVimeo),
    mergeMap(({id}) => this.apiService.fetchVimeoApi(id)
      .pipe(
        map(res => {
          if ( id ) {
            return vimeoMovieLoadedSuccess({movie: this.mapVimeoResponse(res, id)});
          }
        }),
        catchError((err: any) => {
          return of(movieLoadedError({error: err}));
        })
      ))
  ));
}
