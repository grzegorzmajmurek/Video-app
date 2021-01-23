import {Action} from '@ngrx/store';
import {DISPLAY_TYPE, SORT} from '@model/movies.model';

export const ADD_ALERT = '[UI] ADD_ALERT';
export const SORT_BY_DATE = '[UI] SORT_BY_DATE';
export const DISPLAY = '[UI] DISPLAY_TYPE';
export const ONLY_FAVOURITE = '[UI] ONLY FAVOURITE';

export class OnlyFavourite implements Action{
  readonly type = ONLY_FAVOURITE;
  constructor(public onlyFavourite: boolean) {
  }
}

export class AddAlert implements Action {
  readonly type = ADD_ALERT;

  constructor(public text: string) {
  }
}

export class SortByDate implements Action {
  readonly type = SORT_BY_DATE;

  constructor(public sort: SORT) {
  }
}

export class DisplayType implements Action {
  readonly type = DISPLAY;

  constructor(public display: DISPLAY_TYPE) {
  }
}

export type All = AddAlert |
  SortByDate |
  DisplayType |
  OnlyFavourite;


