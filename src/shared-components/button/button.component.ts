import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() label = '';
  @Output() buttonClick = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.buttonClick.emit();
  }

}
