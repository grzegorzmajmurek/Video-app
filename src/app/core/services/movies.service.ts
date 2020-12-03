import { Movie } from './../model/movies.model';
import { Injectable } from '@angular/core';
import { VIDEO_WEBSITE } from '../model/movies.model';
import { extractType } from '../utile/utile';
import { YoutubeApiService } from './youtube-api.service';
import { VimeoApiService } from './vimeo-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})

export class MoviesService {

    constructor( public youtubeService: YoutubeApiService,
                 public vimeoService: VimeoApiService,
                 public localStorage: LocalStorageService ) {
                 }

    movies: Movie[] = [];

    get allMovies(): Movie[] {
        return this.movies;
    }

    selectTypeAndManageAddingMovie(link: string): void {
        const type: VIDEO_WEBSITE = extractType(link);
        if (type === VIDEO_WEBSITE.YOUTUBE) {
            this.youtubeService.addMovie(link).subscribe(movie => this.addMovie(movie));
        }
        if (type === VIDEO_WEBSITE.VIMEO) {
            this.vimeoService.addMovie(link).subscribe(movie => this.addMovie(movie));
        }
    }

    addMovie(movie: Movie): void {

        if (this.movies.length === 0) {
            movie.id = 0;
        } else {
            const lastElement: Movie = this.movies[0];
            movie.id = lastElement.id + 1;
        }
        this.movies.unshift(movie);
        this.localStorage.updateLocalStorage(this.movies);

    }

    deleteAllMovies(): void {
        this.movies = [];
        this.localStorage.updateLocalStorage(this.movies);
    }

    deleteMovie(id: number): void {
        const index = this.movies.findIndex(x => x.id === id);
        this.movies.splice(index, 1);
        this.localStorage.updateLocalStorage(this.movies);
    }

    setFavorite(id: number): void {
        const movie = this.movies.find(x => x.id === id);
        movie.favorite = true;
        this.localStorage.updateLocalStorage(this.movies);
    }

    deleteFavorite(id: number): void {
        const movie = this.movies.find(x => x.id === id);
        movie.favorite = false;
        this.localStorage.updateLocalStorage(this.movies);
    }

    updateMovies(): void {
        this.movies = this.localStorage.setMoviesFromLocalStorage();
    }

}
