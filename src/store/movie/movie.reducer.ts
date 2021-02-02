import * as MovieActions from './movie.actions';
import {compare} from '@utile/utile';
import {Action, createReducer, on} from '@ngrx/store';
import {MovieState} from './movie.state';


const initialState: MovieState = {
  movies: []
};
const movieReducer = createReducer(
  initialState,
  on(MovieActions.youtubeMovieLoadedSuccess, (state, {res}) => {
    const {id, snippet, statistics} = res.items[0];
    const newYData = {
      ...state,
      movies: [{
        movieId: id,
        imageUrl: snippet.thumbnails.default.url,
        title: snippet.title,
        viewCount: statistics.viewCount,
        publishedAt: snippet.publishedAt,
        url: `https://www.youtube.com/embed/${id}`,
        favorite: false
      }, ...state.movies]
    };
    localStorage.setItem('movies', JSON.stringify(newYData.movies));
    return newYData;
  }),
  on(MovieActions.vimeoMovieLoadedSucces, (state, {res, id}) => {
    const newVData = {
      ...state,
      movies: [{
        movieId: id,
        imageUrl: res.pictures.sizes[0].link,
        title: res.name,
        viewCount: '',
        publishedAt: res.created_time,
        url: `https://player.vimeo.com/video/${id}`,
        favorite: false
      }, ...state.movies]
    };
    localStorage.setItem('movies', JSON.stringify(newVData.movies));
    return newVData;
  }),


  on(MovieActions.removeMovie, (state, {id}) => {
    return {
      ...state,
      movies: [...state.movies].filter(movie => movie.movieId !== id)
    };
  }),
  on(MovieActions.addToFavourite, (state, {id}) => {
    return {
      ...state,
      movies: [...state.movies].map(movie => movie.movieId === id ? {...movie, favorite: true} : movie)
    };
  }),
  on(MovieActions.deleteFromFavourite, (state, {id}) => {
    return {
      ...state,
      movies: [...state.movies].map(movie => movie.movieId === id ? {...movie, favorite: false} : movie)
    };
  }),

  on(MovieActions.downloadDataFromLocalStorage, (state) => {
    const movies = JSON.parse(localStorage.getItem('movies'));
    return {
      ...state,
      movies: movies !== null ? movies : state.movies
    };
  }),

  on(MovieActions.updateDataInLocalStorage, (state) => {
    localStorage.setItem('movies', JSON.stringify(state.movies));
    return {
      ...state
    };
  }),

  on(MovieActions.deleteAllMovies, (state) => {
    return {
      ...state,
      movies: []
    };
  }),

  on(MovieActions.sortByDate, (state, {sort}) => {
    return {
      ...state,
      movies: [...state.movies].sort((a, b) => compare(a, b, sort))
    };
  })
);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}
