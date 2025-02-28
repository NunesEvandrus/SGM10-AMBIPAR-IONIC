import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyFormModule } from '@my-core/components/my-form/my-form.module';
import { EquipamentoCadastroPage } from './equipamento-cadastro.page';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyFormModule,
    NgxDocViewerModule
  ],
  declarations: [EquipamentoCadastroPage]
})
export class EquipamentoCadastroPageModule {}
