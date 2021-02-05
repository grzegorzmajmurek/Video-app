import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export enum BUTTON_TYPE {
  BASIC,
  MINI_FAB
}


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() label = '';
  @Input() icon = '';
  @Input() color = 'primary';
  @Input() type: BUTTON_TYPE = BUTTON_TYPE.BASIC;
  @Output() buttonClick = new EventEmitter<void>();
  BUTTON_TYPE = BUTTON_TYPE;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.buttonClick.emit();
  }

}
