import * as movieReducer from './movie/movie.reducer';
import * as uiReducer from './ui/ui.reducer';
import {MovieEffects} from './movie/movie.effects';

export const effects = [MovieEffects];
export const reducers = { data: movieReducer.reducer, ui: uiReducer.reducer };
