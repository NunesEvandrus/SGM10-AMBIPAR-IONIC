import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '@my-core/pipes/pipes.module';
import { DataViewerModule } from './data-viewer/data-viewer.module';
import { RegisterViewerPage } from './register-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    DataViewerModule
  ],
  declarations: [RegisterViewerPage]
})
export class RegisterViewerPageModule {}
