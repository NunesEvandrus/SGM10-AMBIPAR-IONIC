import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../../pipes/pipes.module';
import { MapsPage } from './maps.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PipesModule],
  declarations: [MapsPage]
})
export class MapsPageModule {}
