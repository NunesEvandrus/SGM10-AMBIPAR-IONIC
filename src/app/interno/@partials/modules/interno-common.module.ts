import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GridModule } from 'src/app/@core/components/grid/grid.module';
import { MyFormModule } from 'src/app/@core/components/my-form/my-form.module';
import { MenuToggleModule } from '../components/menu-toggle/menu-toggle.module';

const MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IonicModule,
  GridModule,
  MyFormModule,
  MenuToggleModule
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES]
})
export class InternoCommonModule {}
