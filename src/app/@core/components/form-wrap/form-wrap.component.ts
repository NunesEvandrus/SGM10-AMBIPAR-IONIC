import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-wrap',
  templateUrl: './form-wrap.component.html',
  styleUrls: ['./form-wrap.component.scss']
})
export class FormWrapComponent {
  @Input() saveText = 'Salvar';
  @Output() save = new EventEmitter<void>();

  constructor() {}
}
