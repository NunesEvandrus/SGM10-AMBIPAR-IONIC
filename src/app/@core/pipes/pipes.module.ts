import { NgModule } from '@angular/core';
import { FormataNumeroPipe } from './formata-numero.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
  exports: [SafePipe, FormataNumeroPipe],
  declarations: [SafePipe, FormataNumeroPipe]
})
export class PipesModule {}
