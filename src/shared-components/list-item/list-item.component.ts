import { BUTTON_TYPE } from '@shared-components/button/button.component';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, DISPLAY_TYPE } from '@model/movies.model';
import { DialogComponent } from '@shared-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Store} from '@ngrx/store';;
import {addToFavourite, deleteFromFavourite, removeMovie, updateDataInLocalStorage} from '../../store/movie/movie.actions';
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

  deleteMovie(id: number): void {
    this.store.dispatch(removeMovie({id}));
    this.store.dispatch(updateDataInLocalStorage());
  }

  setFavourite(id: number): void {
    this.store.dispatch(addToFavourite({id}));
    this.store.dispatch(updateDataInLocalStorage());
  }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, { data: { url } });
  }

  deleteFavorite(id: number): void {
    this.store.dispatch(deleteFromFavourite({id}));
    this.store.dispatch(updateDataInLocalStorage());
  }
}
