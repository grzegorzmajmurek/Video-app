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
        if (this.movies.length === 0) {
            movie.id = 0;
        } else {
            const lastElement: Movie = this.movies.slice(-1).pop();
            movie.id = lastElement.id + 1;
        }
        this.movies.push(movie);
        this.updateLocalStorage();

    }

    deleteMovie(id: number): void {
        const index = this.movies.findIndex(x => x.id === id);
        this.movies.splice(index, 1);
        this.updateLocalStorage();
    }

    setFavourite(id: number): void {
        const movie = this.movies.find(x => x.id === id);
        movie.favourite = true;
        this.updateLocalStorage();
    }

    deleteFavorite(id: number): void {
        const movie = this.movies.find(x => x.id === id);
        movie.favourite = false;
        this.updateLocalStorage();
    }

    setMoviesFromLocalStorage(): void {
        const movies = JSON.parse(localStorage.getItem("movies"));
        this.movies = movies;
    }

    updateLocalStorage(): void {
        localStorage.setItem("movies", JSON.stringify(this.movies));
    }
}

