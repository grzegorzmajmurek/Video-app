import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared-components/dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { extractIdFromString } from '../utile/utile';
import { YoutubeApiResponse } from '../model/api-response.model';
import { MoviesService } from '../services/movies.service';
import { Movie, DISPLAY_TYPE } from '../model/movies.model';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  valueFromInput = '';
  DISPLAY_TYPE = DISPLAY_TYPE;
  type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;

  constructor(public apiService: ApiService,
    public moviesService: MoviesService) { }


  ngOnInit(): void {
    this.moviesService.setMoviesFromLocalStorage();
  }


  get allMovies(): Movie[] {
    return this.moviesService.allMovies;
  }

  get rowHeight(): string {
    return this.type === DISPLAY_TYPE.LIST ? '4:1' : '1:2';
  }

  get cols(): string {
    return this.type === DISPLAY_TYPE.LIST ? '1' : '4';
  }

  handleValue(valueFromInput: any): void {

    this.valueFromInput = valueFromInput;
    const idx = extractIdFromString(valueFromInput);


    this.apiService.fetchYoutubeApi(idx)
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


  deleteFavorite(id: number): void {
    this.moviesService.deleteFavorite(id);
  }

  changeDisplayType(type: DISPLAY_TYPE): void {
    this.type = type;
  }

}
