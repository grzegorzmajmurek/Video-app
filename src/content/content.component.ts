import {Movie, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from '@model/movies.model';
import {Component, OnInit} from '@angular/core';
import {VimeoApiResponse, YoutubeApiResponse} from '@model/api-response.model';
import {DISPLAY_TYPE, VIDEO_WEBSITE, SORT} from '@model/movies.model';
import {ApiService} from '@services/api.service';
import {MoviesService} from '@services/movies.service';
import {extractIdAndWebsiteType} from '@utile/utile';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BUTTON_TYPE} from '@shared-components/button/button.component';
import {Store} from '@ngrx/store';
import {DeleteAllMovies, DownloadDataFromLocalStorage, FetchMovieFromVimeo, FetchMovieFromYoutube} from '../store/movie/movie.actions';
import {AppState} from '../store/store.state';
import {getMovies} from '../store/app.selectors';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DisplayType, SortByDate} from '../store/ui/ui.actions';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  value = '';
  SORT = SORT;
  sortType: SORT = SORT.ASC;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  onlyFavoriteMovie = false;
  page: PageEvent = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    length: this.allMovies.length,
  };
  managedMovies: Movie[] = [];

  constructor(public apiService: ApiService,
              public moviesService: MoviesService,
              public snackBar: MatSnackBar,
              private readonly store: Store<AppState>) {
  }


  ngOnInit(): void {
    this.moviesService.setMoviesFromLocalStorage();
    this.store.dispatch(new DownloadDataFromLocalStorage());
    // this.store.select(getMovies).subscribe(v => console.log('onInit', v));
    // this.store.select(getMovies).pipe(
    //   map(movies => {
    //     const onlyFavorite = movies.filter((movie: Movie) => movie.favorite === true);
    //     return this.onlyFavoriteMovie ? onlyFavorite : movies;
    //   })
    // );
    this.managedMovies = this.allMovies;
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.managedMovies, this.page);
    if (sliceMovies.length === 0) {
      const newPageIndex = this.page.pageIndex !== 0 ? this.page.pageIndex - 1 : 0;
      this.page = { ...this.page, ...{ pageIndex: newPageIndex } };
      sliceMovies = this.slicePage(this.managedMovies, this.page);
    }
    return sliceMovies;
  }

  get allMovies(): Movie[] {
    const all = this.moviesService.allMovies;
    this.store.select(getMovies).subscribe(movies => console.log(movies));

    const onlyFavorite = all.filter((movie: Movie) => movie.favorite === true);
    return this.onlyFavoriteMovie ? onlyFavorite : all;
  }

  get getListClass(): string {
    return this.type === DISPLAY_TYPE.LIST ? 'column' : 'wrap';
  }

  handleApiResponse(type: VIDEO_WEBSITE, idVideo: string): void {
    if (type === VIDEO_WEBSITE.VIMEO) {
      this.store.dispatch(new FetchMovieFromVimeo(idVideo));
      this.apiService.fetchVimeoApi(idVideo)
        .subscribe((res: VimeoApiResponse) => {
          const movie: Movie = {
            movieId: idVideo,
            imageUrl: res.pictures.sizes[0].link,
            title: res.name,
            viewCount: '',
            publishedAt: res.created_time,
            url: `https://player.vimeo.com/video/${idVideo}`,
            favorite: false
          };
          this.moviesService.addMovie(movie);
        },
          (err) => {
            this.openSnackBar('To jest niepoprawny link');
            console.error('Handle error from Vimeo', err);
          }
        );
    }
    if (type === VIDEO_WEBSITE.YOUTUBE) {
      this.store.dispatch(new FetchMovieFromYoutube(idVideo));
      this.apiService.fetchYoutubeApi(idVideo)
        .subscribe((res: YoutubeApiResponse) => {
          if (res.items.length === 0) {
            this.openSnackBar('To jest niepoprawny link');
            return;
          }
          const { id, snippet, statistics } = res.items[0];
          const movie: Movie = {
            movieId: id,
            imageUrl: snippet.thumbnails.default.url,
            title: snippet.title,
            viewCount: statistics.viewCount,
            publishedAt: snippet.publishedAt,
            url: `https://www.youtube.com/embed/${id}`,
            favorite: false
          };
          this.moviesService.addMovie(movie);
        },
          (err) => console.error('Handle error from Youtube', err)
        );
    }
  }

  handleValue(valueFromInput: any): void {
    this.value = valueFromInput;
    const { idVideo, videoWebsite } = extractIdAndWebsiteType(valueFromInput);
    const movieExist = this.allMovies.find(movie => movie.movieId === idVideo);
    if (movieExist) {
      this.openSnackBar('Ten film już istnieje');
      return;
    }
    this.handleApiResponse(videoWebsite, idVideo);
  }

  deleteAllMovies(): void {
    this.store.dispatch(new DeleteAllMovies());
    this.moviesService.deleteAllMovies();
    this.managedMovies = this.allMovies;
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.store.dispatch(new DisplayType(type));
    this.type = type;
  }

  selectFavoriteMovies(onlyFavoriteMovie: boolean): void {
    this.onlyFavoriteMovie = onlyFavoriteMovie;
    this.managedMovies = this.allMovies;
  }

  sortByDate(type: SORT): void {
    this.store.dispatch(new SortByDate(type));
    this.sortType = type;
    this.managedMovies = this.managedMovies.sort((a, b) => this.compare(a, b, type));
  }

  pageHandler(page: PageEvent): void {
    this.page = page;
  }

  slicePage(allMovies: Movie[], page: PageEvent): Movie[] {
    return allMovies.slice((page.pageIndex * page.pageSize), (page.pageIndex * page.pageSize) + page.pageSize);
  }

  compare(a: Movie, b: Movie, type: SORT): number {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    let comparison = 0;
    if (type === SORT.ASC) {
      comparison = dateA < dateB ? 1 : -1;
    } else {
      comparison = dateA > dateB ? 1 : -1;
    }
    return comparison;
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
