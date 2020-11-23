import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared-components/dialog/dialog.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  defaultID: any = 'BCy3Y_pE-l0';
  valueFromInput: string = '';

  constructor(public httpClient: HttpClient, private dom: DomSanitizer, public dialog: MatDialog) { }
  get url(): SafeUrl {
    const a = `https://www.youtube.com/embed/${this.id}`;
    return this.dom.bypassSecurityTrustResourceUrl(a);
  }

  get id(): string {
    return this.defaultID;
  }


  ngOnInit(): void {
    let params = new HttpParams();
    const data = {
      part: 'snippet',
      key: 'AIzaSyAVPRtNBbTqBey08rHQRrZPQHgDWYCFcr4',
      maxResults: 9,
      playlistId: 'PLlCWUQK37jVjFbbdZ0hDQQ1iaX_y5Y-sf'
    };
    Object.keys(data).forEach(p => {
      params = params.append(p, data[p]);
    });
    this.httpClient.get('https://www.googleapis.com/youtube/v3/playlistItems', { params })
      .subscribe((res: any) => {
        console.log(res);
        this.defaultID = res.items[0].snippet.resourceId.videoId
      });
  }

  handleValue(valueFromInput: any): void {
    console.log('hee to jest nowa wartosc:', valueFromInput);
    this.valueFromInput = valueFromInput;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {data: {name: this.valueFromInput}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog: ${result}`);
    });
  }

}
