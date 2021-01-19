import {Action} from '@ngrx/store';
import {VimeoApiResponse, YoutubeApiResponse} from '../model/api-response.model';

export const FETCH_MOVIE_FROM_YOUTUBE = '[APP] FETCH_MOVIE_FROM_YOUTUBE';
export const FETCH_MOVIE_FROM_VIMEO = '[APP] FETCH_MOVIE_FROM_VIMEO';
export const YOUTUBE_MOVIE_LOADED_SUCCESS = '[APP] YOUTUBE_MOVIE_LOADED_SUCCESS';
export const VIMEO_MOVIE_LOADED_SUCCESS = '[APP] VIMEO_MOVIE_LOADED_SUCCESS';

export class FetchMovieFromYoutube implements Action {
  readonly type = FETCH_MOVIE_FROM_YOUTUBE;

  constructor(public id: string) {
  }
}

export class FetchMovieFromVimeo implements Action {
  readonly type = FETCH_MOVIE_FROM_VIMEO;

  constructor(public id: string) {
  }
}

export class YoutubeMovieLoadedSucces implements Action {
  readonly type = YOUTUBE_MOVIE_LOADED_SUCCESS;

  constructor(public res: YoutubeApiResponse) {
  }
}

export class VimeoMovieLoadedSucces implements Action {
  readonly type = VIMEO_MOVIE_LOADED_SUCCESS;

  constructor(public res: VimeoApiResponse) {
  }
}

export type All =
  FetchMovieFromYoutube |
  FetchMovieFromVimeo |
  YoutubeMovieLoadedSucces |
  VimeoMovieLoadedSucces;



