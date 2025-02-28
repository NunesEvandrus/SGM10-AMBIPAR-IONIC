import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AcessoWrapModule } from './@partials/acesso-wrap/acesso-wrap.module';
import { AcessoPageRoutingModule } from './acesso-routing.module';
import { AcessoPage } from './acesso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AcessoPageRoutingModule,
    AcessoWrapModule
  ],
  declarations: [AcessoPage]
})
export class AcessoPageModule {}
