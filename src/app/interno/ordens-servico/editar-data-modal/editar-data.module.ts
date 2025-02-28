import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyFormModule } from 'src/app/@core/components/my-form/my-form.module';
import { EditarDataModal } from './editar-data.modal';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, IonicModule, MyFormModule],
  declarations: [EditarDataModal],
  exports: [EditarDataModal]
})
export class EditarDataModalModule {}
