import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {appQuery} from '../app.selectors';
import {
  addToFavourite,
  deleteAllMovies,
  deleteFromFavourite,
  fetchMovieFromVimeo,
  fetchMovieFromYoutube,
  removeMovie,
  sortByDate
} from './movie.actions';
import {SORT} from '@model/movies.model';

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

  deleteAllFilms(): void {
    this.store.dispatch(deleteAllMovies());
  }

  sortByDates(sort: SORT): void {
    this.store.dispatch(sortByDate({sort}));
  }

  deleteFilm(id: string): void {
    this.store.dispatch(removeMovie({id}));
  }

  setFavouriteFilm(id: string): void {
    this.store.dispatch(addToFavourite({id}));
  }

  deleteFavoriteFilm(id: string): void {
    this.store.dispatch(deleteFromFavourite({id}));
  }
}
