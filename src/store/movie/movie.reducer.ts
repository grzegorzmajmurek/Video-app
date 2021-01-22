import * as MovieActions from './movie.actions';


export type Action = MovieActions.All;
const defaultState = {
  movies: []
};

export function MovieRedcuer(state = defaultState, action: Action): any {
  let movieId = 0;
  if (state.movies.length !== 0) {
    const lastElement = state.movies[state.movies.length - 1];
    movieId = lastElement.id + 1;
  }
  switch (action.type) {
    case MovieActions.YOUTUBE_MOVIE_LOADED_SUCCESS:
      const {id, snippet, statistics} = action.res.items[0];
      return {
        ...state,
        movies: [...state.movies, {
          id: movieId,
          movieId: id,
          imageUrl: snippet.thumbnails.default.url,
          title: snippet.title,
          viewCount: statistics.viewCount,
          publishedAt: snippet.publishedAt,
          url: `https://www.youtube.com/embed/${id}`,
          favorite: false
        }]
      };
    case MovieActions.VIMEO_MOVIE_LOADED_SUCCESS:
      return {
        ...state,
        movies: [...state.movies,
          {
            id: movieId,
            movieId: action.id,
            imageUrl: action.res.pictures.sizes[0].link,
            title: action.res.name,
            viewCount: '',
            publishedAt: action.res.created_time,
            url: `https://player.vimeo.com/video/${action.id}`,
            favorite: false
          }
        ]
      };
    case MovieActions.REMOVE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.id)
      };
    case MovieActions.ADD_MOVIE_TO_FAVOURITE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.id ? {...movie, favorite: true} : movie)
      };
    case MovieActions.DELETE_MOVIE_FROM_FAVOURITE:
      return {
        ...state,
        movies: state.movies.map(movie => movie.id === action.id ? {...movie, favorite: false} : movie)
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
        state
      };
    case MovieActions.DELETE_ALL_MOVIES:
      return {
        ...state,
        movies: []
      };
    default:
      return state;
  }
}

