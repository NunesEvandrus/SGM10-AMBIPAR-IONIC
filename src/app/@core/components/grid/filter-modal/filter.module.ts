import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyFormModule } from '../../my-form/my-form.module';
import { FilterModal } from './filter.modal';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, IonicModule, MyFormModule],
  declarations: [FilterModal],
  exports: [FilterModal]
})
export class FilterModalModule {}
