import { Movie } from './../model/movies.model';
import { Component, OnInit} from '@angular/core';
import { VimeoApiResponse, YoutubeApiResponse } from '../model/api-response.model';
import { DISPLAY_TYPE, VIDEO_WEBSITE, SORT } from '../model/movies.model';
import { ApiService } from '../services/api.service';
import { MoviesService } from '../services/movies.service';
import { extractIdAndWebsiteType } from '../utile/utile';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BUTTON_TYPE } from '../shared-components/button/button.component';

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
    pageIndex: 0,
    pageSize: 3,
    length: this.allMovies.length,
  };
  sortedMovies: Movie[] = [];

  constructor(public apiService: ApiService,
              public moviesService: MoviesService, public snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.moviesService.setMoviesFromLocalStorage();
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.favoriteMovies, this.page);
    if (sliceMovies.length === 0) {
      const newPageIndex = this.page.pageIndex !== 0 ? this.page.pageIndex - 1 : 0;
      this.page = { ...this.page, ...{ pageIndex: newPageIndex } };
      sliceMovies = this.slicePage(this.favoriteMovies, this.page);
    }
    return sliceMovies.sort((a, b) => this.compare(a, b, this.sortType));
  }

  get allMovies(): Movie[] {
    return this.moviesService.allMovies;

  }
  get favoriteMovies(): Movie[] {
    const onlyFavorite = this.allMovies.filter((movie: Movie) => movie.favorite === true);
    return !this.onlyFavoriteMovie ? this.allMovies : onlyFavorite;
  }

  get rowHeight(): string {
    return this.type === DISPLAY_TYPE.LIST ? '4:1' : '1:2';
  }

  get cols(): string {
    return this.type === DISPLAY_TYPE.LIST ? '1' : '4';
  }

  handleApiResponse(type: VIDEO_WEBSITE, idVideo: string): void {
    if (type === VIDEO_WEBSITE.VIMEO) {
      this.apiService.fetchVimeoApi(idVideo)
        .subscribe((res: VimeoApiResponse) => {
          const movie: Movie = {
            movieId: idVideo,
            image: {
              url: res.pictures.sizes[0].link,
              width: res.pictures.sizes[0].width,
              height: res.pictures.sizes[0].height
            },
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
      this.apiService.fetchYoutubeApi(idVideo)
        .subscribe((res: YoutubeApiResponse) => {

          if (res.items.length === 0) {
            this.openSnackBar('To jest niepoprawny link');
            return;
          }
          const { id, snippet, statistics } = res.items[0];
          const movie: Movie = {
            movieId: id,
            image: {
              url: snippet.thumbnails.default.url,
              width: snippet.thumbnails.default.width,
              height: snippet.thumbnails.default.height,
            },
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
    this.moviesService.deleteAllMovies();
  }


  deleteFavorite(id: number): void {
    this.moviesService.deleteFavorite(id);
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavoriteMovies(onlyFavouriteMovie: boolean): void {
    this.onlyFavoriteMovie = onlyFavouriteMovie;
  }

  sortByDate(type: SORT): void {
    this.sortType = type;
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
    }
    else {
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
