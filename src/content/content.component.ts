import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared-components/dialog/dialog.component';
import { ApiService } from '../services/api.service';
import { extractIdFromString } from '../utile/utile';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultID: any = '';
  valueFromInput: string = '';

  constructor(public apiService: ApiService, private dom: DomSanitizer, public dialog: MatDialog) { }
  
  
  get url(): SafeUrl {
    const a = `https://www.youtube.com/embed/${this.id}`;
    return this.dom.bypassSecurityTrustResourceUrl(a);
  }

  get id(): string {
    return this.defaultID;
  }


  ngOnInit(): void {
     this.apiService.fetchYoutubeApi(this.valueFromInput)
      .subscribe((res: any) => {
        console.log(res);
        this.defaultID = res.items[0].id
      });
  }

  handleValue(valueFromInput: any): void {
    console.log('hee to jest nowa wartosc:', valueFromInput);
    this.valueFromInput = valueFromInput;
    const id = extractIdFromString(valueFromInput);
    this.apiService.fetchYoutubeApi(id)
      .subscribe((res: any) => {
        console.log(res);
        this.defaultID = res.items[0].id
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {data: {url: this.url}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog: ${result}`);
    });
  }

}
