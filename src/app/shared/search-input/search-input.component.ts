import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() value = '';
  @Output() valueChanged = new EventEmitter<string>();

  onChangeValue(value: string): void {
    this.valueChanged.emit(value);
  }
}
