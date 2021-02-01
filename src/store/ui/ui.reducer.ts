import * as UiActions from './ui.actions';

export type Action = UiActions.All;
const defaultState = {
  alert: null,
  onlyFavourite: false
};

export function UiRedcuer(state = defaultState, action: Action) {
  switch (action.type) {
    case UiActions.ADD_ALERT:
      return {
        ...state,
        alert: action.text
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
