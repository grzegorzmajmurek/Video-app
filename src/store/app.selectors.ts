import {createSelector} from '@ngrx/store';
import {MovieState} from './movie/movie.state';
import {UiState} from './ui/ui.state';
import {Movie} from '@model/movies.model';

export interface AppState {
  data: MovieState;
  ui: UiState;
}
export const getUi = (state: AppState) => state.ui;
export const getData = (state: AppState) => state.data;
export const getAllMovies = createSelector(getData, (state: MovieState) => state.movies);

export const getManagedMovie = createSelector(
  getData,
  getUi,
  (data: MovieState, ui: UiState) => {
    const onlyFavorite = data.movies.filter((movie: Movie) => movie.favorite);
    return  ui.onlyFavourite ? onlyFavorite : data.movies;
  });

