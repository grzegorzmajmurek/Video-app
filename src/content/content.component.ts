import { Movie } from './../model/movies.model';
import { Component, OnInit, OnChanges } from '@angular/core';
import { VimeoApiResponse, YoutubeApiResponse } from '../model/api-response.model';
import { DISPLAY_TYPE, VIDEO_WEBSITE, SORT } from '../model/movies.model';
import { ApiService } from '../services/api.service';
import { MoviesService } from '../services/movies.service';
import { extractIdAndWebsiteType } from '../utile/utile';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  SORT = SORT;
  sortType: SORT = SORT.ASC;
  DISPLAY_TYPE = DISPLAY_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  onlyFavouriteMovie: boolean = false;
  page: PageEvent = {
    pageIndex: 0,
    pageSize: 3,
    length: this.allMovies.length,
  };
  sortedMovies: Movie[] = [];

  constructor(public apiService: ApiService,
    public moviesService: MoviesService) { }


  ngOnInit(): void {
    this.moviesService.setMoviesFromLocalStorage();
  }

  get sortedMoviesList(): Movie[] {
    let sliceMovies = this.slicePage(this.favourtiteMovies, this.page);
    if (sliceMovies.length === 0) {
      const newPageIndex = this.page.pageIndex !== 0 ? this.page.pageIndex - 1 : 0;
      this.page = { ...this.page, ...{ pageIndex: newPageIndex } };
      sliceMovies = this.slicePage(this.favourtiteMovies, this.page);
    }
    return sliceMovies.sort((a, b) => this.compare(a, b, this.sortType));
  }

  get allMovies(): Movie[] {
    return this.moviesService.allMovies;

  }
  get favourtiteMovies(): Movie[] {
    const onlyFavourite = this.allMovies.filter((movie: Movie) => movie.favourite === true);
    return !this.onlyFavouriteMovie ? this.allMovies : onlyFavourite;
  }

  get rowHeight(): string {
    return this.type === DISPLAY_TYPE.LIST ? '4:1' : '1:2';
  }

  get cols(): string {
    return this.type === DISPLAY_TYPE.LIST ? '1' : '4';
  }

  handleApiResponse(type: VIDEO_WEBSITE, idVideo: string): void {
    console.log(type);
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
            favourite: false
          };
          this.moviesService.addMovie(movie);
        })
    }
    if (type === VIDEO_WEBSITE.YOUTUBE) {
      this.apiService.fetchYoutubeApi(idVideo)
        .subscribe((res: YoutubeApiResponse) => {
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
            favourite: false
          };
          this.moviesService.addMovie(movie);
        });
    }
  }

  handleValue(valueFromInput: any): void {
    const { idVideo, videoWebsite } = extractIdAndWebsiteType(valueFromInput);
    this.handleApiResponse(videoWebsite, idVideo);
  }


  deleteFavorite(id: number): void {
    this.moviesService.deleteFavorite(id);
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

  selectFavouriteMovies(onlyFavouriteMovie: boolean): void {
    this.onlyFavouriteMovie = onlyFavouriteMovie;
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
}
