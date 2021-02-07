import { onlyFavouriteMovies } from './ui.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class UiFacade {

  constructor(private store: Store) {
  }

  selectFavoriteMovies(onlyFavourite: boolean): void {
    this.store.dispatch(onlyFavouriteMovies({isOnlyFavourite: onlyFavourite}));
  }
}
