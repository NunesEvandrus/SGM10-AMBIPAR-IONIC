import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@my-core/pipes/pipes.module';
import { DataViewerComponent } from './data-viewer.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PipesModule],
  declarations: [DataViewerComponent],
  exports: [DataViewerComponent],
})
export class DataViewerModule {}
