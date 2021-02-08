import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent {
  @Input() value = '';
  @Output() valueChanged = new EventEmitter<string>();

  onChangeValue(event: any): void {
    this.valueChanged.emit(event.target.value);
  }

}
