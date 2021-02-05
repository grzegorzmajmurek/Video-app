import * as UiActions from './ui.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { UiState } from './ui.state';

const initialState = {
  error: null,
  onlyFavourite: false
};

const uiReducer = createReducer(
  initialState,
  on(UiActions.movieLoadedError, (state, {error}) => {
    return {
      ...state,
      error
    };
  }),
  on(UiActions.onlyFavouriteMovies, (state, {isOnlyFavourite}) => ({
    ...state,
    onlyFavourite: isOnlyFavourite
  }))
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
