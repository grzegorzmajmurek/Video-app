import { createAction, props } from '@ngrx/store';

export const onlyFavouriteMovies = createAction(
  'ONLY FAVOURITE',
  props<{isOnlyFavourite: boolean}>()
);

export const movieLoadedError = createAction(
  'MOVIE ERROR',
  props<{error: any}>()
);
