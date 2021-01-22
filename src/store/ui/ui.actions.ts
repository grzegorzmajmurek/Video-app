import {Action} from '@ngrx/store';
import {DISPLAY_TYPE, SORT} from '@model/movies.model';

export const ADD_ALERT = '[UI] ADD_ALERT';
export const SORT_BY_DATE = '[UI] SORT_BY_DATE';
export const DISPLAY = '[UI] DISPLAY_TYPE';

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

// w tym przypadku action.type jest rowny `DISPLAY_CARD`, wdzialabym tytaj cos w rodzaju action.display
// ktory bedzie rowny  CARD lub LIST. Jednak by tak sie stalo do konstruktora w klasie DisplayCard() musisz to ddodac.
// Dodatkowo gdy robisz dispach, nie przekazujesz do klasy DisplayCard zadnego parametru? Dlaczego ?
                // zmienilabym nazwe klasy na DisplayType() zeby byla bardziej unwersalna

export type All = AddAlert |
  SortByDate |
  DisplayType;


