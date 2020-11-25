import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dom: DomSanitizer) { }

  ngOnInit(): void {
  }

  get url(): SafeUrl {
    return this.dom.bypassSecurityTrustResourceUrl(this.data.url);
  }
}
