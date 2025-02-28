import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToggleComponent } from './menu-toggle.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [MenuToggleComponent],
  exports: [MenuToggleComponent],
})
export class MenuToggleModule {}
