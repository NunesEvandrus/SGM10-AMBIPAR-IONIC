import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-campo-estatico',
  templateUrl: './campo-estatico.component.html',
  styleUrls: ['./campo-estatico.component.scss']
})
export class CampoEstaticoComponent {
  @Input() label: string;
  @Input() required: boolean;
  @Input() value: string;
  @Input() photo: boolean;
  @Input() button = true;

  constructor() {}
}
