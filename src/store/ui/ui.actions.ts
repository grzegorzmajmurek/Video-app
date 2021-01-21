import {Action} from '@ngrx/store';

export const ADD_ALERT = '[UI] ADD ALERT';

export class AddAlert implements Action {
  readonly type = ADD_ALERT;

  constructor(public text: string) {
  }
}

export type All = AddAlert;

