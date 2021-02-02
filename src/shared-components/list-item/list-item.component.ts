import { BUTTON_TYPE } from '@shared-components/button/button.component';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, DISPLAY_TYPE } from '@model/movies.model';
import { DialogComponent } from '@shared-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Store} from '@ngrx/store';;
import {addToFavourite, deleteFromFavourite, removeMovie} from '../../store/movie/movie.actions';
import {AppState} from '../../store/app.selectors';

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
  constructor(public dialog: MatDialog, private readonly store: Store<AppState>) { }

  ngOnInit(): void {
 }

  deleteMovie(id: string): void {
    this.store.dispatch(removeMovie({id}));
  }

  setFavourite(id: string): void {
    this.store.dispatch(addToFavourite({id}));
  }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, { data: { url } });
  }

  deleteFavorite(id: string): void {
    this.store.dispatch(deleteFromFavourite({id}));
  }
}
