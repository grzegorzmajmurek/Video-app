import { Component, OnInit, Input } from '@angular/core';
import { Movie, DISPLAY_TYPE } from '../../model/movies.model';
import { MoviesService } from '../../services/movies.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  @Input() movie: Movie;
  DISPLAY_TYPE = DISPLAY_TYPE;
  constructor(public moviesService: MoviesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('movie', this.movie)
  }


  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id);
  }

  setFavourite(id: number): void {
    this.moviesService.setFavourite(id);
  }

  // deleteFavorite(id: number): void {
  //   this.moviesService.deleteFavorite(id);
  // }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, { data: { url } });

  }

}
