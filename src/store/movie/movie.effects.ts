import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {ApiService} from '@services/api.service';
import {
  fetchMovieFromVimeo,
  fetchMovieFromYoutube,
  vimeoMovieLoadedSuccess,
  youtubeMovieLoadedSuccess
} from './movie.actions';
import {addAlert} from '../ui/ui.actions';
import {VimeoApiResponse, YoutubeApiResponse} from '@model/api-response.model';
import {Movie} from '@model/movies.model';

@Injectable()
export class MovieEffects {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }

  mapYoutubeResponse(res: YoutubeApiResponse): Movie {
    const {id, snippet, statistics} = res.items[0];
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
        imageUrl: res.pictures.sizes[0].link,
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
          if (!id || res.items.length === 0) {
            return addAlert({text: 'Podałeś niepoprawny link do YouTube'});
          }
          return youtubeMovieLoadedSuccess({movie: this.mapYoutubeResponse(res)});
        })
      ))
  ));

  loadVimeoMovie$ = createEffect(() => this.actions$.pipe(
    ofType(fetchMovieFromVimeo),
    mergeMap(({id}) => this.apiService.fetchVimeoApi(id)
      .pipe(
        map(res => {
          if (id) {
            return vimeoMovieLoadedSuccess({movie: this.mapVimeoResponse(res, id)});
          } else {
            return addAlert({text: 'Podałeś niepoprawny link do Vimeo'});
          }
        })
      ))
  ));
}
