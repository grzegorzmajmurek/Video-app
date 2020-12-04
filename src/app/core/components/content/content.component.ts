import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BUTTON_TYPE} from '@shared/button/button.component';
import {Movie, SORT, DISPLAY_TYPE, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE} from '@model/movies.model';
import {MoviesService} from '@services/movies.service';
import { Observable } from 'rxjs';
import { DEFAULT_PAGE_LENGTH } from '@model/movies.model';
import { map } from 'rxjs/operators';
import { compareByDate, slicePage } from '@utile/utile';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  value = '';
  SORT = SORT;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  onlyFavoriteMovie = false;
  pageOption: PageEvent = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    length: DEFAULT_PAGE_LENGTH,
  };
  movies$: Observable<Movie[]>;
  managedMovies$: Observable<Movie[]>

  constructor(public moviesService: MoviesService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.moviesService.updateMovies();
    this.movies$ = this.moviesService.moviesObs;
    this.managedMovies$ = this.movies$;
    this.displayMovieByPageOption();
  }

  get getListClass(): string {
    return this.type === DISPLAY_TYPE.LIST ? 'column' : 'wrap';
  }

  handleValue(valueFromInput: string): void {
    this.value = valueFromInput;
    this.displayMovieByPageOption();
    this.moviesService.managedAddingMovie(valueFromInput)
      .subscribe(movieAdded => {
        if (!movieAdded) {
          this.openSnackBar('Ten film już istnieje lub podałeś błędny link!');
        }
      });
  }

  deleteAllMovies(): void {
    this.moviesService.deleteAllMovies();
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavoriteMovies(onlyFavoriteMovie: boolean): void {
    this.onlyFavoriteMovie = onlyFavoriteMovie;
    const onlyFavorite = this.movies$.pipe(map(movies => movies.filter((movie: Movie) => movie.favorite === true)));
    this.managedMovies$ = this.onlyFavoriteMovie ? onlyFavorite : this.movies$;
  }

  sortByDate(type: SORT): void {
  this.managedMovies$ = this.movies$.pipe(map(movies => movies.sort((a ,b) => compareByDate(a, b, type))));
  }

  pageHandler(pageOption: PageEvent): void {
    this.pageOption = pageOption;
    this.displayMovieByPageOption();
  }

  displayMovieByPageOption(): void {
    this.managedMovies$ = this.movies$.pipe(
      map(movies => {
        let sliceMovies = slicePage(movies, this.pageOption);
        if (sliceMovies.length === 0) {
          const newPageIndex = this.pageOption.pageIndex !== 0 ? this.pageOption.pageIndex - 1 : 0;
          this.pageOption = {...this.pageOption, ...{pageIndex: newPageIndex}};
          sliceMovies = slicePage(movies, this.pageOption);
        }
        return sliceMovies;
      })
    );
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Zamknij', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
