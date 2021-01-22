import {Action} from '@ngrx/store';
import {VimeoApiResponse, YoutubeApiResponse} from '@model/api-response.model';
import {Movie} from '@model/movies.model';

export const FETCH_MOVIE_FROM_YOUTUBE = '[MOVIE] FETCH_MOVIE_FROM_YOUTUBE';
export const FETCH_MOVIE_FROM_VIMEO = '[MOVIE] FETCH_MOVIE_FROM_VIMEO';
export const YOUTUBE_MOVIE_LOADED_SUCCESS = '[MOVIE] YOUTUBE_MOVIE_LOADED_SUCCESS';
export const VIMEO_MOVIE_LOADED_SUCCESS = '[MOVIE] VIMEO_MOVIE_LOADED_SUCCESS';
export const REMOVE_MOVIE = '[MOVIE] REMOVE_MOVIE';
export const ADD_MOVIE_TO_FAVOURITE = '[MOVIE] ADD_TO_FAVOURITE';
export const DELETE_MOVIE_FROM_FAVOURITE = '[MOVIE] DELETE_FROM_FAVOURITE';
export const DOWNLOAD_DATA_FROM_LOCAL_STORAGE = '[MOVIE] DOWNLOAD_DATA_FROM_LOCAL_STORAGE';
export const UPDATE_DATA_IN_LOCAL_STORAGE = '[MOVIE] UPDATE_DATA_IN_LOCAL_STORAGE';
export const DELETE_ALL_MOVIES = '[MOVIE] DELETE_ALL_MOVIES';

export class DeleteAllMovies {
  readonly type = DELETE_ALL_MOVIES;
  constructor() {
  }
}

export class DownloadDataFromLocalStorage implements Action {
  readonly type = DOWNLOAD_DATA_FROM_LOCAL_STORAGE;

  constructor() {
  }
}

export class UpdateDataInLocalStorage implements Action {
  readonly type = UPDATE_DATA_IN_LOCAL_STORAGE;

  constructor(public data: Movie[]) {
  }
}

export class AddToFavourite implements Action {
  readonly type = ADD_MOVIE_TO_FAVOURITE;

  constructor(public id: number) {
  }
}

export class DeleteFromFavourite implements Action {
  readonly type = DELETE_MOVIE_FROM_FAVOURITE;

  constructor(public id: number) {
  }
}

export class RemoveMovie implements Action {
  readonly type = REMOVE_MOVIE;

  constructor(public id: number) {
  }
}

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

  constructor(public res: VimeoApiResponse, public id: string) {
  }
}

export type All =
  FetchMovieFromYoutube |
  FetchMovieFromVimeo |
  YoutubeMovieLoadedSucces |
  VimeoMovieLoadedSucces |
  RemoveMovie |
  AddToFavourite |
  DeleteFromFavourite |
  DownloadDataFromLocalStorage |
  UpdateDataInLocalStorage |
  DeleteAllMovies;
