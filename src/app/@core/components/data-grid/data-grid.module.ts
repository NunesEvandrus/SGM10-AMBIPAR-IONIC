import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UiModule } from '../ui/ui.module';
import { ColumnFilterComponent } from './components/column-filter/column-filter.component';
import { DataGridConfig } from './config/data-grid-config';
import { DATAGRID_CONFIG } from './config/data-grid-config.constants';
import { DataGridComponent } from './data-grid.component';

import { ActionsColumnDirective } from './directives/data-grid-templates.directive';


export { DataGridConfig, DataGridStylesConfig, DataGridPagingConfig, DataGridExportingConfig, EnumDataGridMode, EnumAutoFitMode } from './config/data-grid-config';
export { DataGridComponent, GridDataModel, GridRowModel, GridColumnModel } from './data-grid.component';
export { DataGridColumnModel, DataGridSortingModel, EnumAlignment, EnumSortDirection } from './models/data-grid-column.model';
export { ColumnFilterModel } from './models/column-filter.model';
export { ColumnReorderingDefinitionsModel, ColumnReorderingDefinitionsItemModel } from './models/column-reordering-definitions.model';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UiModule,
        DataGridComponent,
        ActionsColumnDirective,        
        ColumnFilterComponent,        
    ],
    exports: [
        DataGridComponent,
        ActionsColumnDirective
    ],
    providers: [
        
    ],
})
export class NgxTjrjDataGridModule {
  static forRoot(config: DataGridConfig): ModuleWithProviders<NgxTjrjDataGridModule> {
    return {
      ngModule: NgxTjrjDataGridModule,
      providers: [
        {
          provide: DATAGRID_CONFIG,
          useValue: config,
        }
      ]
    };
  }
}
