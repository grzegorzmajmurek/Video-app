import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BUTTON_TYPE} from '@shared/button/button.component';
import {Movie, SORT, DISPLAY_TYPE, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, VIDEO_WEBSITE} from '@model/movies.model';
import {MoviesService} from '@services/movies.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  value = '';
  SORT = SORT;
  sortType: SORT = SORT.ASC;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  onlyFavoriteMovie = false;
  pageOption: PageEvent = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    length: this.allMovies.length,
  };
  managedMovies: Movie[] = [];

  constructor(public moviesService: MoviesService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.moviesService.updateMovies();
    this.managedMovies = this.allMovies;
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.managedMovies, this.pageOption);
    if (sliceMovies.length === 0) {
      const newPageIndex = this.pageOption.pageIndex !== 0 ? this.pageOption.pageIndex - 1 : 0;
      this.pageOption = {...this.pageOption, ...{pageIndex: newPageIndex}};
      sliceMovies = this.slicePage(this.managedMovies, this.pageOption);
    }
    return sliceMovies;
  }

  get allMovies(): Movie[] {
    const all = this.moviesService.allMovies;
    const onlyFavorite = all.filter((movie: Movie) => movie.favorite === true);
    return this.onlyFavoriteMovie ? onlyFavorite : all;
  }

  get getListClass(): string {
    return this.type === DISPLAY_TYPE.LIST ? 'column' : 'wrap';
  }

  handleValue(valueFromInput: string): void {
    this.value = valueFromInput;
    this.moviesService.managedAddingMovie(valueFromInput)
      .subscribe(movieAdded => {
        if (!movieAdded) {
          this.openSnackBar('Ten film już istnieje lub podałeś błędny link!');
        }
      });
  }

  deleteAllMovies(): void {
    this.moviesService.deleteAllMovies();
    this.managedMovies = this.allMovies;
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavoriteMovies(onlyFavoriteMovie: boolean): void {
    this.onlyFavoriteMovie = onlyFavoriteMovie;
    this.managedMovies = this.allMovies;
  }

  sortByDate(type: SORT): void {
    this.sortType = type;
    this.managedMovies = this.managedMovies.sort((a, b) => this.compare(a, b, type));
  }

  pageHandler(pageOption: PageEvent): void {
    this.pageOption = pageOption;
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
