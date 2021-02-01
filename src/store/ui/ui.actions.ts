import {Action} from '@ngrx/store';

export const ADD_ALERT = '[UI] ADD_ALERT';
export const ONLY_FAVOURITE = '[UI] ONLY FAVOURITE';

export class OnlyFavourite implements Action {
  readonly type = ONLY_FAVOURITE;

  constructor(public onlyFavourite: boolean) {
  }
}

export class AddAlert implements Action {
  readonly type = ADD_ALERT;

  constructor(public text: string) {
  }
}

export type All = AddAlert |
  OnlyFavourite;


