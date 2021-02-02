import * as UiActions from './ui.actions';
import {Action, createReducer, on} from '@ngrx/store';
import {UiState} from './ui.state';

const initialState = {
  alert: null,
  onlyFavourite: false
};

const uiReducer = createReducer(
  initialState,
  on(UiActions.addAlert, (state, {text}) =>{
    return {
      ...state,
      alert: text
    };
  }),
  on(UiActions.onlyFavouriteMovies, (state, {isOnlyFavourite}) =>{
    return {
      ...state,
      onlyFavourite: isOnlyFavourite
    };
  })
);

export function reducer(state: UiState | undefined, action: Action) {
  return uiReducer(state, action);
}
