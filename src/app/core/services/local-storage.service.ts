import {Movie} from '@model/movies.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalStorageService {


  updateLocalStorage(movies): void {
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  setMoviesFromLocalStorage(): Movie[] {
    return JSON.parse(localStorage.getItem('movies'));
  }

}
