import { BUTTON_TYPE } from '@shared-components/button/button.component';
import { DialogComponent } from '@shared-components/dialog/dialog.component';

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Movie, DISPLAY_TYPE } from '@model/movies.model';

import { MovieFacade } from '@store/movie/movie-facade.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() type: DISPLAY_TYPE = DISPLAY_TYPE.LIST;
  @Input() movie: Movie;
  DISPLAY_TYPE = DISPLAY_TYPE;
  BUTTON_TYPE = BUTTON_TYPE;

  constructor(public dialog: MatDialog, public appFacade: MovieFacade) {
  }

  ngOnInit(): void {
  }

  deleteMovie(id: string): void {
    this.appFacade.deleteMovie(id);
  }

  setFavourite(id: string): void {
    this.appFacade.setFavouriteMovie(id);
  }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, {data: {url}});
  }

  deleteFavorite(id: string): void {
    this.appFacade.deleteFavoriteMovie(id);
  }
}
