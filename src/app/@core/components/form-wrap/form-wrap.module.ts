import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormWrapComponent } from './form-wrap.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [FormWrapComponent],
  exports: [FormWrapComponent]
})
export class FormWrapModule {}
