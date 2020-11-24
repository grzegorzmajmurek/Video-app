import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared-components/dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { extractIdFromString } from '../utile/utile';
import { YoutubeApiResponse } from '../model/api-response.model';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../model/movies.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  valueFromInput = '';

  constructor(public apiService: ApiService,
              private dom: DomSanitizer,
              public dialog: MatDialog,
              public moviesService: MoviesService) { }


  ngOnInit(): void {
  }


  get allMovies(): Movie[] {
    return this.moviesService.allMovies;
  }

  trustUrl(url: string): SafeUrl {
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }
  
  handleValue(valueFromInput: any): void {

    this.valueFromInput = valueFromInput;
    const idx = extractIdFromString(valueFromInput);


    this.apiService.fetchYoutubeApi(idx)
      .subscribe((res: YoutubeApiResponse) => {
        const { id, snippet, statistics } = res.items[0];
        const movie: Movie = {
          id,
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

  openDialog(url: string): void {
    const dialogRef = this.dialog.open(DialogComponent, { data: { url: this.trustUrl(url) } });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog: ${result}`);
    });
  }

}
