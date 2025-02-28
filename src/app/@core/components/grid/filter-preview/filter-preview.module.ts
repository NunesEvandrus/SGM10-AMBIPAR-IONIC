import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MyFormModule } from '../../my-form/my-form.module';
import { FilterPreviewComponent } from './filter-preview.component';

@NgModule({
  imports: [CommonModule, IonicModule, MyFormModule],
  declarations: [FilterPreviewComponent],
  exports: [FilterPreviewComponent]
})
export class FilterPreviewModule {}
