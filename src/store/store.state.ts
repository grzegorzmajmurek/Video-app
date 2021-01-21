import {MovieRedcuer} from './movie/movie.reducer';
import {UiRedcuer} from './ui/ui.reducer';
import {UiState} from './ui/ui.state';
import {MovieState} from './movie/movie.state';

export interface AppState {
  data: MovieState;
  ui: UiState;
}

export const appStateReducers = {
  data: MovieRedcuer,
  ui: UiRedcuer
};
