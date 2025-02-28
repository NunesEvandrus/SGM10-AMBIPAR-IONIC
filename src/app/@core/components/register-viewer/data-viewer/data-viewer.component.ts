import { Component, Input, OnInit } from '@angular/core';
import { IRegisterField } from '../register-viewer.types';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.scss']
})
export class DataViewerComponent implements OnInit {
  @Input() fields: IRegisterField[];
  @Input() data: any;
  maxLabelLength: number;

  constructor() {}

  ngOnInit(): void {
    this.maxLabelLength = this.fields.length
      ? this.fields
          .map((column) => column.Label.length)
          .reduce((a, b) => (a > b ? a : b))
      : 0;
  }
}
