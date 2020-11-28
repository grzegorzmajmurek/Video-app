import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;
  @Output() page = new EventEmitter<PageEvent>();

  constructor() { }

  ngOnInit(): void {
  }
  pageEvent(pageEvent: PageEvent): void {
    this.page.emit(pageEvent);
  }
}
