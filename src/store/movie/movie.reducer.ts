import * as MovieActions from './movie.actions';
import { MovieState } from './movie.state';

import { compare } from '@utile/utile';

import { Action, createReducer, on } from '@ngrx/store';


const initialState: MovieState = {
  movies: []
};
const movieReducer = createReducer(
  initialState,
  on(MovieActions.youtubeMovieLoadedSuccess, (state, {movie}) => ({
    ...state,
    movies: [movie, ...state.movies]
  })),
  on(MovieActions.vimeoMovieLoadedSuccess, (state, {movie}) => ({
    ...state,
    movies: [movie, ...state.movies]
  })),

  on(MovieActions.removeMovie, (state, {id}) => ({
    ...state,
    movies: [...state.movies].filter(movie => movie.movieId !== id)
  })),
  on(MovieActions.addToFavourite, (state, {id}) => ({
    ...state,
    movies: [...state.movies].map(movie => movie.movieId === id ? {...movie, favorite: true} : movie)
  })),
  on(MovieActions.deleteFromFavourite, (state, {id}) => ({
    ...state,
    movies: [...state.movies].map(movie => movie.movieId === id ? {...movie, favorite: false} : movie)
  })),

  on(MovieActions.deleteAllMovies, (state) => ({
    ...state,
    movies: []
  })),

  on(MovieActions.sortByDate, (state, {sort}) => ({
    ...state,
    movies: [...state.movies].sort((a, b) => compare(a, b, sort))
  }))
);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}
