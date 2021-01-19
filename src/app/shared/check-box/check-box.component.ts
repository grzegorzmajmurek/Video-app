import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Output() change = new EventEmitter<boolean>();

  onChecked(value: boolean): void {
    this.change.emit(value);
  }
}
