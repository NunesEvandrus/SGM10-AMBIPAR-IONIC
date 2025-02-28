import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AcessoWrapComponent } from './acesso-wrap.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [AcessoWrapComponent],
  exports: [AcessoWrapComponent]
})
export class AcessoWrapModule {}
