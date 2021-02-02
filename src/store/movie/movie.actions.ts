import {createAction, props} from '@ngrx/store';
import {VimeoApiResponse, YoutubeApiResponse} from '@model/api-response.model';
import {SORT} from '@model/movies.model';

export const deleteAllMovies = createAction(
  '[MOVIE] DELETE_ALL_MOVIES'
);

export const addToFavourite = createAction(
  '[MOVIE] ADD_TO_FAVOURITE',
  props<{ id: string }>()
);

export const deleteFromFavourite = createAction(
  '[MOVIE] DELETE_FROM_FAVOURITE',
  props<{ id: string }>()
);

export const removeMovie = createAction(
  '[MOVIE] REMOVE_MOVIE',
  props<{ id: string }>()
);

export const fetchMovieFromYoutube = createAction(
  '[MOVIE] FETCH_MOVIE_FROM_YOUTUBE',
  props<{ id: string }>()
);

export const fetchMovieFromVimeo = createAction(
  '[MOVIE] FETCH_MOVIE_FROM_VIMEO',
  props<{ id: string }>()
);

export const youtubeMovieLoadedSuccess = createAction(
  '[MOVIE] YOUTUBE_MOVIE_LOADED_SUCCESS',
  props<{ res: YoutubeApiResponse }>()
);

export const vimeoMovieLoadedSucces = createAction(
  '[MOVIE] VIMEO_MOVIE_LOADED_SUCCESS',
  props<{ res: VimeoApiResponse, id: string }>()
);

export const sortByDate = createAction(
  '[MOVIE] SORT_BY_DATE',
  props<{ sort: SORT }>()
);
