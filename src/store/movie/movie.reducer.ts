import * as MovieActions from './movie.actions';
import {compare} from '@utile/utile';


export type Action = MovieActions.All;
const defaultState = {
  movies: []
};

export function MovieRedcuer(state = defaultState, action: Action): any {
  switch (action.type) {
    case MovieActions.YOUTUBE_MOVIE_LOADED_SUCCESS:
      const {id, snippet, statistics} = action.res.items[0];
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
    case MovieActions.VIMEO_MOVIE_LOADED_SUCCESS:
      const newVData = {
        ...state,
        movies: [{
          movieId: action.id,
          imageUrl: action.res.pictures.sizes[0].link,
          title: action.res.name,
          viewCount: '',
          publishedAt: action.res.created_time,
          url: `https://player.vimeo.com/video/${action.id}`,
          favorite: false
        }, ...state.movies]
      };
      localStorage.setItem('movies', JSON.stringify(newVData.movies));
      return newVData;
    case MovieActions.REMOVE_MOVIE:
      return {
        ...state,
        movies: [...state.movies].filter(movie => movie.movieId !== action.id)
      };
    case MovieActions.ADD_MOVIE_TO_FAVOURITE:
      return {
        ...state,
        movies: [...state.movies].map(movie => movie.movieId === action.id ? {...movie, favorite: true} : movie)
      };
    case MovieActions.DELETE_MOVIE_FROM_FAVOURITE:
      return {
        ...state,
        movies: [...state.movies].map(movie => movie.movieId === action.id ? {...movie, favorite: false} : movie)
      };
    case MovieActions.DOWNLOAD_DATA_FROM_LOCAL_STORAGE:
      const movies = JSON.parse(localStorage.getItem('movies'));
      return {
        ...state,
        movies: movies !== null ? movies : state.movies
      };
    case MovieActions.UPDATE_DATA_IN_LOCAL_STORAGE:
      localStorage.setItem('movies', JSON.stringify(state.movies));
      return {
        ...state
      };
    case MovieActions.DELETE_ALL_MOVIES:
      return {
        ...state,
        movies: []
      };
    case MovieActions.SORT_BY_DATE:
      return {
        ...state,
        movies: [...state.movies].sort((a, b) => compare(a, b, action.sort))
      };
    default:
      return state;
  }
}

