import {Movie, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from '@model/movies.model';
import {Component, OnInit} from '@angular/core';
import {DISPLAY_TYPE, VIDEO_WEBSITE, SORT} from '@model/movies.model';
import {extractIdAndWebsiteType} from '@utile/utile';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BUTTON_TYPE} from '@shared-components/button/button.component';
import {Store} from '@ngrx/store';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {
  deleteAllMovies,
  fetchMovieFromVimeo,
  fetchMovieFromYoutube, sortByDate,
} from '../store/movie/movie.actions';
import {getManagedMovie, getAllMovies, AppState} from '../store/app.selectors';
import {onlyFavouriteMovies} from '../store/ui/ui.actions';

@UntilDestroy()
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  value = '';
  SORT = SORT;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  onlyFavoriteMovie = false;
  allMovies: Movie[] = [];
  page: PageEvent = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    length: this.allMovies.length,
  };
  managedMovies: Movie[] = [];

  constructor(public snackBar: MatSnackBar,
              private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.select(getAllMovies)
      .pipe(untilDestroyed(this))
      .subscribe(allMovies => this.allMovies = allMovies);
    this.store.select(getManagedMovie)
      .pipe(untilDestroyed(this))
      .subscribe(movies => this.managedMovies = movies);
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.managedMovies, this.page);
    if (sliceMovies.length === 0) {
      const newPageIndex = this.page.pageIndex !== 0 ? this.page.pageIndex - 1 : 0;
      this.page = {...this.page, ...{pageIndex: newPageIndex}};
      sliceMovies = this.slicePage(this.managedMovies, this.page);
    }
    return sliceMovies;
  }

  get getListClass(): string {
    return this.type === DISPLAY_TYPE.LIST ? 'column' : 'wrap';
  }

  handleApiResponse(type: VIDEO_WEBSITE, id: string): void {
    if (type === VIDEO_WEBSITE.VIMEO) {
      this.store.dispatch(fetchMovieFromVimeo({id}));
    }
    if (type === VIDEO_WEBSITE.YOUTUBE) {
      this.store.dispatch(fetchMovieFromYoutube({id}));
    }
  }

  handleValue(valueFromInput: any): void {
    this.value = valueFromInput;
    const {idVideo, videoWebsite} = extractIdAndWebsiteType(valueFromInput);
    const movieExist = this.allMovies.find(movie => movie.movieId === idVideo);
    if (movieExist) {
      this.openSnackBar('Ten film już istnieje');
      return;
    }
    this.handleApiResponse(videoWebsite, idVideo);
  }

  deleteAllMovies(): void {
    this.store.dispatch(deleteAllMovies());
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavoriteMovies(onlyFavourite: boolean): void {
    this.store.dispatch(onlyFavouriteMovies({isOnlyFavourite: onlyFavourite}));
  }

  sortByDate(sort: SORT): void {
    this.store.dispatch(sortByDate({sort}));
  }

  pageHandler(page: PageEvent): void {
    this.page = page;
  }

  slicePage(allMovies: Movie[], page: PageEvent): Movie[] {
    return allMovies.slice((page.pageIndex * page.pageSize), (page.pageIndex * page.pageSize) + page.pageSize);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
