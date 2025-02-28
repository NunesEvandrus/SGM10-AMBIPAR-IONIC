import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { FilterModalModule } from './filter-modal/filter.module';
import { FilterPreviewModule } from './filter-preview/filter-preview.module';
import { GridComponent } from './grid.component';
import { PaginationModule } from './pagination/pagination.module';

@NgModule({
  declarations: [GridComponent],
  exports: [
    GridComponent,
    PaginationModule,
    FilterModalModule,
    FilterPreviewModule
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule,
    PaginationModule,
    FilterModalModule,
    FilterPreviewModule
  ]
})
export class GridModule {}
