import * as UiActions from './ui.actions';
import {DISPLAY_TYPE, SORT} from '@model/movies.model';

export type Action = UiActions.All;
const defaultState = {
  alert: null,
  sort: SORT.ASC,
  display: DISPLAY_TYPE.LIST,
  onlyFavourite: false
};

export function UiRedcuer(state = defaultState, action: Action) {
  switch (action.type) {
    case UiActions.ADD_ALERT:
      return {
        ...state,
        alert: action.text
      };
    case UiActions.SORT_BY_DATE:
      return {
        ...state,
        sort: action.sort
      };
    case UiActions.DISPLAY:
      return {
        ...state,
        display: action.display
      };
    case UiActions.ONLY_FAVOURITE:
      return {
        ...state,
        onlyFavourite: action.onlyFavourite
      };
    default:
      return state;
  }
}
