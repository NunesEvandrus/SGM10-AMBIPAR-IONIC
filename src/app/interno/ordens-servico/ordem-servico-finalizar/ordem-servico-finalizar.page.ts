import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { BaseFormPage } from '@my-core/abstracts-pages/form.base-page';
import { IControl } from '@my-core/components/my-form/my-form.types';
import { SessionProvider } from '@my-core/providers/session.provider';
import { AlertOurError } from '@my-core/utils/alert.utils';
import { OurError } from '@my-core/utils/our-error.utils';
import { OrdensServicoApi } from '../ordens-servico.api';
import {
  IFuncionario,
  IMaterial,
  IMaterialUtilizado,
  IOrdemServicoFinalizar,
  TipoMaterialEnum
} from '../ordens-servico.interfaces';
import {
  CreateInputsFinalizarOS,
  CreateInputsMateriais
} from './ordem-servico.utils';
import {
  IColumn,
  IFilter,
  IPaginator,
  ISorting,
  ListParams,
  PAGE_SIZES,
  SortDirection as SortDirectionEnum
} from '@my-core/components/grid';
@Component({
  selector: 'app-ordem-servico-finalizar',
  templateUrl: './ordem-servico-finalizar.page.html',
  styleUrls: ['./ordem-servico-finalizar.page.scss']
})
export class OrdemServicoFinalizarPage
  extends BaseFormPage<IOrdemServicoFinalizar>
  implements OnInit
{
  abaAtiva = 'execucao';
  formValue: Partial<IOrdemServicoFinalizar> = {};
  funcionarios: IFuncionario[] = [];
  tarefas: { id: number; nome: string; descricao: string; marcada: boolean }[] =
    [];
  materiais: IMaterial[] = [];
  materiaisUtilizados: {
    id: number;
    nomeMaterial: string;
    unidade: string;
    quantidade: number;
    marcado: boolean;
  }[] = [];

  formControls: IControl[] = CreateInputsFinalizarOS([], false);
  formControlsMateriais: IControl[] = CreateInputsMateriais([]);

  get tarefasMarcadas() {
    return this.tarefas.filter((tarefa) => tarefa.marcada).length;
  }
  // get materiaisMarcados() {
  //   return this.materiaisUtilizados.filter((material) => material.marcado)
  //     .length;
  // }
  constructor(
    protected readonly modalCtrl: ModalController,
    protected readonly alertCtrl: AlertController,
    public sessionProvider: SessionProvider,
    private ordensServicoApi: OrdensServicoApi
  ) {
    super('ordem de serviço', modalCtrl, alertCtrl);
  }

  ngOnInit() {
    this.init();
  }

  async prepareForm() {
    const baseAtiva = await this.sessionProvider.getBaseAtiva();
    this.funcionarios = await this.ordensServicoApi.funcionarios(baseAtiva.id);
    this.materiais = await this.ordensServicoApi.listaMateriais();
    this.formControls = CreateInputsFinalizarOS(this.funcionarios);
    this.formControlsMateriais = CreateInputsMateriais(this.materiais);

    const ordemServico = await this.ordensServicoApi.buscaProgramacao(this.id);

    if (!ordemServico) {
      throw new OurError('Registro não encontrado');
    }

    this.tarefas = ordemServico.tarefas.map((tarefa) => ({
      id: tarefa.id,
      nome: tarefa.nome,
      descricao: tarefa.descricao,
      marcada: true
    }));

    this.materiaisUtilizados = ordemServico.materiais.map((material) => ({
      id: material.id,
      nomeMaterial: material.nomeMaterial,
      unidade: material.unidade,
      quantidade: 0,
      marcado: false
    }));

    this.formValue = {
      programacaoId: ordemServico.id,
      tag: ordemServico.tag,
      data: ordemServico.data,
      dataExecucao: new Date().toISOString(),
      gerarCorretiva: false
    };

    this.formValue = { ...this.formValue };
  }

  async atualizaInformacoes(ev: { field: string; form: UntypedFormGroup }) {
    try {
      this.loading = true;

      if (ev.field === 'gerarCorretiva') {
        ev.form.controls.descricaoCorretiva?.setValue(null);

        const gerarCorretiva = ev.form.controls.gerarCorretiva?.value;
        this.formControls = CreateInputsFinalizarOS(
          this.funcionarios,
          gerarCorretiva
        );
      }
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Não foi possível carregar a tela',
        err
      );
    }
    this.loading = false;
  }

  async salvaFoto(foto: string) {
    try {
      if (foto) {
        await this.ordensServicoApi.salvarFotoProgramacao(
          this.id,
          foto,
          foto.split(';')[0].split('/')[1]
        );
      }
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Não foi possível salvar a foto, mas sua OS foi finalizada com sucesso.',
        err
      );
    }
    this.loading = false;
  }

  async persisteRegistro(
    registro: IOrdemServicoFinalizar & {
      foto1: string;
      foto2: string;
      foto3: string;
      foto4: string;
      foto5: string;
      foto6: string;
      foto7: string;
      foto8: string;
    }
  ) {
    registro.tempoExecucaoH = new Date(registro.tempoExecucao).getHours();
    registro.tempoExecucaoM = new Date(registro.tempoExecucao).getMinutes();
    const { foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8 } = registro;
    delete registro.foto1;
    delete registro.foto2;
    delete registro.foto3;
    delete registro.foto4;
    delete registro.foto5;
    delete registro.foto6;
    delete registro.foto7;
    delete registro.foto8;
    // delete registro.tempoExecucao;

    registro.tarefas = this.tarefas
      .filter((tarefa) => tarefa.marcada)
      .map((tarefa) => tarefa.id);

    registro.materiais = this.materiaisUtilizados
      .filter((material) => material.marcado)
      .map((material) => ({
        id: material.id,
        quantidade: material.quantidade,
        nomeMaterial: material.nomeMaterial
      })) as IMaterialUtilizado[];

    registro.programacaoId = +this.id;

    const fotos = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8];
    for (const foto of fotos) {
      if (foto) {
        await this.salvaFoto(foto);
      }
    }
    await this.ordensServicoApi.finalizarProgramacao(registro);
  }

  async AdicionarMaterial($event: IMaterialUtilizado) {
    try {
      //varificar se o material já foi adicionado
      let materialExistente = this.materiaisUtilizados.find(
        (m) => m.id === $event.id
      );
      if (materialExistente) {
        //remover o material da lista materiaisUtilizados
        this.materiaisUtilizados = this.materiaisUtilizados.filter(
          (m) => m.id !== $event.id
        );
        // porque está concatenando ao invés de somar?
        materialExistente.quantidade =
          Number($event.quantidade) + Number(materialExistente.quantidade);
        this.materiaisUtilizados.push(materialExistente);
      } else {
        let materialSelecionado =
          await this.ordensServicoApi.recuperaMaterialById($event.id);
        let material: IMaterial = {
          id: materialSelecionado.id,
          nomeMaterial: materialSelecionado.nomeMaterial,
          unidade: materialSelecionado.unidade,
          tipoMaterial: materialSelecionado.tipoMaterial,
          referencia: '',
          codigo: '',
          codigoSAP: '',
          fabricante: '',
          marca: '',
          valorUnitario: 0,
          foto: '',
          usuario: '',
          quantidade: $event.quantidade,
          marcado: true
        };
        this.materiaisUtilizados.push(material as any);
      }
    } catch (err) {
      await AlertOurError(
        this.alertCtrl,
        'Não foi possível adicionar o material',
        err
      );
    }
  }
}
