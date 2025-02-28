import { Component, Input } from '@angular/core';
import { IFilter } from '..';
import { ControlType, IControl } from '../../my-form/my-form.types';

@Component({
  selector: 'app-filter-preview',
  templateUrl: './filter-preview.component.html',
  styleUrls: ['./filter-preview.component.scss'],
})
export class FilterPreviewComponent {
  @Input() filter: IFilter = {};
  @Input() filterMaps: { [filterKey: string]: { [value: string]: string } } = {};
  @Input() filterControls: IControl[] = [];
  controlTypes = ControlType;

  constructor() {}
}
