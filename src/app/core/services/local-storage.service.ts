import { Movie } from '@model/movies.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  updateLocalStorage(movies: Movie[]): void {
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  setMoviesFromLocalStorage(): Movie[] {
    const storage = JSON.parse(localStorage.getItem('movies'));
    return storage === null ? [] : storage;
  }
}
