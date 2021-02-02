import {createAction, props} from '@ngrx/store';
import {VimeoApiResponse, YoutubeApiResponse} from '@model/api-response.model';
import {SORT} from '@model/movies.model';

export const deleteAllMovies = createAction(
  '[MOVIE] DELETE_ALL_MOVIES'
);


export const downloadDataFromLocalStorage = createAction(
  '[MOVIE] DOWNLOAD_DATA_FROM_LOCAL_STORAGE'
);


export const updateDataInLocalStorage = createAction(
  '[MOVIE] UPDATE_DATA_IN_LOCAL_STORAGE'
);


export const addToFavourite = createAction(
  '[MOVIE] ADD_TO_FAVOURITE',
  props<{ id: number }>()
);


export const deleteFromFavourite = createAction(
  '[MOVIE] DELETE_FROM_FAVOURITE',
  props<{ id: number }>()
);

export const removeMovie = createAction(
  '[MOVIE] REMOVE_MOVIE',
  props<{ id: number }>()
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
