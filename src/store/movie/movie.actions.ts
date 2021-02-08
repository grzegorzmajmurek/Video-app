import { createAction, props } from '@ngrx/store';
import { Movie, SORT } from '@model/movies.model';

export const deleteAllMovies = createAction(
  'DELETE_ALL_MOVIES'
);

export const toggleFavourite = createAction(
  'TOGGLE_FAVOURITE',
  props<{id: Movie['movieId'], isFavourite: boolean}>()
);

export const removeMovie = createAction(
  'REMOVE_MOVIE',
  props<{id: Movie['movieId']}>()
);

export const fetchMovieFromYoutube = createAction(
  'FETCH_MOVIE_FROM_YOUTUBE',
  props<{id: Movie['movieId']}>()
);

export const fetchMovieFromVimeo = createAction(
  'FETCH_MOVIE_FROM_VIMEO',
  props<{id: Movie['movieId']}>()
);

export const youtubeMovieLoadedSuccess = createAction(
  'YOUTUBE_MOVIE_LOADED_SUCCESS',
  props<{movie: Movie}>()
);

export const vimeoMovieLoadedSuccess = createAction(
  'VIMEO_MOVIE_LOADED_SUCCESS',
  props<{movie: Movie}>()
);

export const sortByDate = createAction(
  'SORT_BY_DATE',
  props<{sort: SORT}>()
);
