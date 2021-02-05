import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { appQuery } from '../app.selectors';

import {
  addToFavourite,
  deleteAllMovies,
  deleteFromFavourite,
  fetchMovieFromVimeo,
  fetchMovieFromYoutube,
  removeMovie,
  sortByDate
} from './movie.actions';

import { SORT } from '@model/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {
  allMovies$ = this.store.select(appQuery.getAllMovies);
  managedMovies$ = this.store.select(appQuery.getManagedMovie);

  constructor(private store: Store) {
  }

  loadMovieFromYoutube(id: string): void {
    this.store.dispatch(fetchMovieFromYoutube({id}));
  }

  loadMovieFromVimeo(id: string): void {
    this.store.dispatch(fetchMovieFromVimeo({id}));
  }

  deleteAllMovies(): void {
    this.store.dispatch(deleteAllMovies());
  }

  sortByDates(sort: SORT): void {
    this.store.dispatch(sortByDate({sort}));
  }

  deleteMovie(id: string): void {
    this.store.dispatch(removeMovie({id}));
  }

  setFavouriteMovie(id: string): void {
    this.store.dispatch(addToFavourite({id}));
  }

  deleteFavoriteMovie(id: string): void {
    this.store.dispatch(deleteFromFavourite({id}));
  }
}
