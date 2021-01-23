import { BUTTON_TYPE } from '@shared-components/button/button.component';
import { Component, OnInit, Input } from '@angular/core';
import { Movie, DISPLAY_TYPE } from '@model/movies.model';
import { DialogComponent } from '@shared-components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/store.state';
import {AddToFavourite, DeleteFromFavourite, RemoveMovie, UpdateDataInLocalStorage} from '../../store/movie/movie.actions';

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
    this.store.dispatch(new RemoveMovie(id));
    this.store.dispatch(new UpdateDataInLocalStorage());
  }

  setFavourite(id: number): void {
    this.store.dispatch(new AddToFavourite(id));
    this.store.dispatch(new UpdateDataInLocalStorage());
  }

  openDialog(url: string): void {
    this.dialog.open(DialogComponent, { data: { url } });
  }

  deleteFavorite(id: number): void {
    this.store.dispatch(new DeleteFromFavourite(id));
    this.store.dispatch(new UpdateDataInLocalStorage());
  }
}
