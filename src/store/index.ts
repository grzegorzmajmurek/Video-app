import * as movieReducer from './movie/movie.reducer';
import * as uiReducer from './ui/ui.reducer';
import { MovieEffects } from './movie/movie.effects';
import { MovieFacade } from './movie/movie-facade.service';
import { UiFacade } from './ui/ui-facade.service';
import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export const effects = [MovieEffects];
export const reducers = {data: movieReducer.reducer, ui: uiReducer.reducer};
export const facade = [MovieFacade, UiFacade];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['data'], rehydrate: true})(reducer);
}
