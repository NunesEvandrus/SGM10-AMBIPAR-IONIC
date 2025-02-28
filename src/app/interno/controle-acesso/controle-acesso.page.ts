import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BaseListPage } from '@my-core/abstracts-pages/list.base-page';
import { IFilter, IPaginator, ISorting } from '@my-core/components/grid';
import { sortFilterAndPaginateItems } from '@my-core/components/grid/grid.utils';
import {
  IControl,
  SELECT_BOOLEAN_OPTIONS
} from '@my-core/components/my-form/my-form.types';
import {
  GeraCampoSimples,
  GeraSelectSimples
} from '@my-core/components/my-form/my-form.utils';
import { SessionProvider } from '@my-core/providers/session.provider';
import { ControleAcessoApi } from './controle-acesso.api';
import { IUsuario } from './controle-acesso.interfaces';

@Component({
  selector: 'app-controle-acesso',
  templateUrl: './controle-acesso.page.html',
  styleUrls: ['./controle-acesso.page.scss']
})
export class ControleAcessoPage
  extends BaseListPage<IUsuario>
  implements OnInit
{
  @ViewChild('editCell', { static: true }) editCell: TemplateRef<any>;

  filterControls: IControl[] = [
    GeraCampoSimples('id', 'ID'),
    GeraCampoSimples('nome', 'Nome'),
    GeraCampoSimples('email', 'E-mail'),
    GeraCampoSimples('user', 'Usuário'),
    // GeraSelectSimples('perfil.Exact', 'Perfil', PERFIS_ACESSO_OPTIONS),
    GeraSelectSimples('ativo.Exact', 'Usuário Ativo', SELECT_BOOLEAN_OPTIONS)
  ];

  filterMaps = {
    // perfil: PERFIL_ACESSO_MAP,
  };

  constructor(
    protected modalCtrl: ModalController,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    public sessionProvider: SessionProvider,
    private controleAcessoApi: ControleAcessoApi
  ) {
    super(modalCtrl, activatedRoute, router);
    this.title = 'Controle de Acesso';
  }

  ngOnInit() {
    this.columns = [
      {
        Label: 'ID',
        Key: 'id'
      },
      {
        Label: 'Nome',
        Key: 'nome'
      },
      {
        Label: 'E-mail',
        Key: 'email'
      },
      {
        Label: 'Usuário',
        Key: 'user'
      },
      {
        Label: 'Perfil',
        Key: 'perfil',
        Formatter: (perfil: string) => perfil
      },
      {
        Label: 'Usuário Ativo',
        Key: 'ativo',
        Formatter: (ativo: boolean) => (ativo ? 'Sim' : 'Não')
      }
      // {
      //   Label: 'Ações',
      //   CssClass: 'ws-nowrap',
      //   Key: 'id',
      //   NoSort: true,
      //   Template: this.editCell,
      // },
    ];

    this.init();
  }

  async getItems(
    paginator: IPaginator,
    sorting: ISorting<IUsuario>,
    filter: IFilter
  ) {
    const registros = await this.controleAcessoApi.listaTodos();

    return sortFilterAndPaginateItems(
      registros,
      { ...paginator, ...sorting },
      filter
    );
  }

  async editarPerfil(id: number) {
    alert('Esta ação ainda não está disponível no sistema.');
  }

  // async abrirFormulario(id?: string) {
  //   const result = await ModalPresentUtil(
  //     this.modalCtrl,
  //     MotoristaCadastroPage,
  //     { id },
  //     'large-modal'
  //   );

  //   if (result.role === ModalCloseStatus.CONFIRM) {
  //     this.list();
  //   }
  // }
}
