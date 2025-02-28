import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@my-core/pipes/pipes.module';
import { CampoEstaticoComponent } from './campo-estatico.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, PipesModule, IonicModule],
  declarations: [CampoEstaticoComponent],
  exports: [CampoEstaticoComponent]
})
export class CampoEstaticoModule {}
