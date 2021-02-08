import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { appQuery } from '../app.selectors';

import {
  toggleFavourite,
  deleteAllMovies,
  fetchMovieFromVimeo,
  fetchMovieFromYoutube,
  removeMovie,
  sortByDate
} from './movie.actions';

import { Movie, SORT } from '@model/movies.model';

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {
  allMovies$ = this.store.select(appQuery.getAllMovies);
  managedMovies$ = this.store.select(appQuery.getManagedMovie);

  constructor(private store: Store) {
  }

  loadMovieFromYoutube(id: Movie['id']): void {
    this.store.dispatch(fetchMovieFromYoutube({id}));
  }

  loadMovieFromVimeo(id: Movie['id']): void {
    this.store.dispatch(fetchMovieFromVimeo({id}));
  }

  deleteAllMovies(): void {
    this.store.dispatch(deleteAllMovies());
  }

  sortByDates(sort: SORT): void {
    this.store.dispatch(sortByDate({sort}));
  }

  deleteMovie(id: Movie['id']): void {
    this.store.dispatch(removeMovie({id}));
  }

  toggleFavouriteMovie(id: Movie['id'], isFavourite: boolean): void {
    this.store.dispatch(toggleFavourite({id, isFavourite}));
  }

}
