import * as UiActions from './ui.actions';

export type Action = UiActions.All;
const defaultState = {
  alert: null
};

export function UiRedcuer(state = defaultState, action: Action) {
  switch (action.type) {
    case UiActions.ADD_ALERT:
      return {
        ...state,
        alert: action.text
      };
    default:
      return state;
  }
}
