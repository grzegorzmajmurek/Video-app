import { Injectable } from '@angular/core';
import { Movie } from '../model/movies.model';

@Injectable({
    providedIn: 'root',
})

export class MoviesService {
    constructor() { }
    movies: Movie[] = [];


    get allMovies(): Movie[] {
        return this.movies;
    }

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }



}

