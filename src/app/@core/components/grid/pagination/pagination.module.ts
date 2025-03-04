import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, IonicModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class PaginationModule {}
