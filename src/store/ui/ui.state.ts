import {DISPLAY_TYPE, SORT} from '@model/movies.model';

export interface UiState {
  alert: string;
  sort: SORT;
  display: DISPLAY_TYPE;
  onlyFavourite: boolean;
}
