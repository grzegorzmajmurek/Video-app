import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Movie } from '@model/movies.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie, private dom: DomSanitizer) {
  }

  get url(): SafeUrl {
    return this.dom.bypassSecurityTrustResourceUrl(this.data.url);
  }
}
