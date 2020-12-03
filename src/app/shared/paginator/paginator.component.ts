import {Component, Input, EventEmitter, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Output() page = new EventEmitter<PageEvent>();

  pageEvent(pageEvent: PageEvent): void {
    this.page.emit(pageEvent);
  }
}
