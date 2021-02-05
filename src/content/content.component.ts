import { Movie, DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '@model/movies.model';
import { DISPLAY_TYPE, VIDEO_WEBSITE, SORT } from '@model/movies.model';

import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BUTTON_TYPE } from '@shared-components/button/button.component';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { extractIdAndWebsiteType } from '@utile/utile';

import { MovieFacade } from '@store/movie/movie-facade.service';
import { UiFacade } from '@store/ui/ui-facade.service';

import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  allMovies: Observable<Movie[]> = new Observable();
  page: PageEvent = {
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    length: DEFAULT_PAGE_SIZE,
  };
  managedMovies: Movie[] = [];

  constructor(public snackBar: MatSnackBar,
              public movieFacade: MovieFacade,
              public uiFacade: UiFacade) {
  }

  ngOnInit(): void {
    this.allMovies = this.movieFacade.allMovies$;
    combineLatest(this.movieFacade.managedMovies$)
      .pipe(untilDestroyed(this))
      .subscribe(([movies]) => {
        this.managedMovies = movies;
      });
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.managedMovies, this.page);
    if ( sliceMovies.length === 0 ) {
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
    if ( type === VIDEO_WEBSITE.VIMEO ) {
      this.movieFacade.loadMovieFromVimeo(id);
    }
    if ( type === VIDEO_WEBSITE.YOUTUBE ) {
      this.movieFacade.loadMovieFromYoutube(id);
    }
  }

  handleValue(valueFromInput: any): void {
    this.value = valueFromInput;
    const {idVideo, videoWebsite} = extractIdAndWebsiteType(valueFromInput);
    const subAllMovies = this.allMovies
      .pipe(
        map(movies => movies.find(movie => movie.movieId === idVideo)),
        untilDestroyed(this)
      )
      .subscribe(movieExist => {
        if ( movieExist ) {
          this.openSnackBar('Ten film już istnieje');
        } else {
          this.handleApiResponse(videoWebsite, idVideo);
        }
      });
    subAllMovies.unsubscribe();
  }

  deleteAllMovies(): void {
    this.movieFacade.deleteAllMovies();
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavoriteMovies(onlyFavourite: boolean): void {
    this.uiFacade.selectFavoriteFilms(onlyFavourite);
  }

  sortByDate(sort: SORT): void {
    this.movieFacade.sortByDates(sort);
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
