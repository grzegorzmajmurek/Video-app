import {createAction, props} from '@ngrx/store';

export const onlyFavouriteMovies = createAction(
  '[UI] ONLY FAVOURITE',
  props<{ isOnlyFavourite: boolean }>()
);

export const addAlert = createAction(
  '[UI] ADD_ALERT',
  props<{ text: string }>()
);
