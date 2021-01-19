import { Movie } from '@model/movies.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {

  updateLocalStorage(movies: Movie[]): void {
    localStorage.setItem('data', JSON.stringify(movies));
  }

  getDataFromLocalStorage(): Movie[] {
    const storage = JSON.parse(localStorage.getItem('data'));
    return storage === null ? [] : storage;
  }
}
