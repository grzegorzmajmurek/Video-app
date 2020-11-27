import { Component, OnInit } from '@angular/core';
import { VimeoApiResponse, YoutubeApiResponse } from '../model/api-response.model';
import { DISPLAY_TYPE, Movie, VIDEO_WEBSITE } from '../model/movies.model';
import { ApiService } from '../services/api.service';
import { MoviesService } from '../services/movies.service';
import { extractIdAndWebsiteType } from '../utile/utile';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
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

}
