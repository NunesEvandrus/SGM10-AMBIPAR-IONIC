import { NgModule } from '@angular/core';
import { GridModule } from 'src/app/@core/components/grid/grid.module';
import { InternoCommonModule } from '../@partials/modules/interno-common.module';
import { ControleAcessoPageRoutingModule } from './controle-acesso-routing.module';
import { ControleAcessoPage } from './controle-acesso.page';

@NgModule({
  imports: [InternoCommonModule, ControleAcessoPageRoutingModule, GridModule],
  declarations: [ControleAcessoPage]
})
export class ControleAcessoPageModule {}
