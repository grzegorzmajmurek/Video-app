import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './store.state';
import {MovieState} from './movie/movie.state';
import {UiState} from './ui/ui.state';
import {Movie} from '@model/movies.model';

const getAppState = createFeatureSelector('app');

export const getUi = createSelector(getAppState, (state: AppState) => state.ui);
export const getData = createSelector(getAppState, (state: AppState) => state.data);
export const getAllMovies = createSelector(getData, (state: MovieState) => state.movies);

export const getManagedMovie = createSelector(
  getData,
  getUi,
  (data: MovieState, ui: UiState) => {
    const onlyFavorite = data.movies.filter((movie: Movie) => movie.favorite === true);
    return  ui.onlyFavourite ? onlyFavorite : data.movies;
  });

