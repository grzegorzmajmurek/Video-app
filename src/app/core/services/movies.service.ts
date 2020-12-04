import { Movie } from '@model/movies.model';
import { Injectable } from '@angular/core';
import { VIDEO_WEBSITE } from '@model/movies.model';
import { extractType } from '@utile/utile';
import { YoutubeApiService } from './youtube-api.service';
import { VimeoApiService } from './vimeo-api.service';
import { LocalStorageService } from './local-storage.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class MoviesService {

  private movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  public readonly moviesObs: Observable<Movie[]> = this.movies$.asObservable();

  constructor(public youtubeService: YoutubeApiService,
    public vimeoService: VimeoApiService,
    public localStorage: LocalStorageService) {
  }

  get movies(): Movie[] {
    return this.movies$.getValue();
  }

  managedAddingMovie(link: string): Observable<boolean> {
    const type: VIDEO_WEBSITE = extractType(link);
    if (type === VIDEO_WEBSITE.YOUTUBE) {
      return this.youtubeService.addMovie(link).pipe(map(movie => this.checkMovieAdding(movie)));
    }
    if (type === VIDEO_WEBSITE.VIMEO) {
      return this.vimeoService.addMovie(link).pipe(map(movie => this.checkMovieAdding(movie)));
    }
  }

  addMovie(movie: Movie): void {

    if (this.movies.length === 0) {
      movie.id = 0;
    } else {
      const lastElement: Movie = this.movies[0];
      movie.id = lastElement.id + 1;
    }
    this.updateMoviesAndLocalStorage([movie, ...this.movies]);
  }

  deleteAllMovies(): void {
    this.updateMoviesAndLocalStorage([]);
  }

  deleteMovie(id: number): void {
    const newMovies = this.movies.filter(movie => movie.id !== id);
    this.updateMoviesAndLocalStorage(newMovies);
  }

  setFavorite(id: number, favorite: boolean): void {
    const newMovies = [...this.movies];
    const movie = newMovies.find(x => x.id === id);
    movie.favorite = favorite;
    this.updateMoviesAndLocalStorage(newMovies);
  }

  updateMovies(): void {
    this.movies$.next(this.localStorage.setMoviesFromLocalStorage());
  }

  movieExist(movie: Movie): boolean {
    return this.movies.some(m => m.movieId === movie.movieId);
  }

  checkMovieAdding(movie: Movie): boolean {
    const added = false;
    if (movie && !this.movieExist(movie)) {
      this.addMovie(movie);
      return !added;
    }
    return added;
  }

  updateMoviesAndLocalStorage(movies: Movie[]): void {
    this.movies$.next(movies);
    this.localStorage.updateLocalStorage(this.movies);
  }
}
