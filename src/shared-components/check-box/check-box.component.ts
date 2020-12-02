import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {


  @Input() label = '';
  @Input() checked = false;
  @Output() isChecked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onChecked(value: boolean): void {
    this.isChecked.emit(value);
  }

}
