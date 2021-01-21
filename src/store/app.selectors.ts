import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './store.state';
import {MovieState} from './movie/movie.state';

const getAppState = createFeatureSelector('app');

export const getUi = createSelector(getAppState, (state: AppState) => state.ui);
export const getData = createSelector(getAppState, (state: AppState) => state.data);
export const getMovies = createSelector(getData, (state: MovieState) => state.movies);
