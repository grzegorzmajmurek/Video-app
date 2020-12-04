import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {BUTTON_TYPE} from '../button/button.component';
import {DialogComponent} from '../dialog/dialog.component';
import {Movie, DISPLAY_TYPE} from '@model/movies.model';
import {MoviesService} from '@services/movies.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  @Input() movie: Movie;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;

  constructor(public moviesService: MoviesService, public dialog: MatDialog) {
  }

  deleteMovie(id: number): void {
    this.moviesService.deleteMovie(id);
  }

  setFavorite(id: number): void {
    this.moviesService.setFavorite(id, true);
  }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, {data: {url}});
  }

  deleteFavorite(id: number): void {
    this.moviesService.setFavorite(id, false);
  }
}
