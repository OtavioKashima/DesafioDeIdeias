import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Adicionado
import { FormsModule } from '@angular/forms'; // <-- Adicionado (Resolve o erro NG8002 do ngModel)
import { IonicModule } from '@ionic/angular'; // <-- Adicionado (Resolve os erros NG8001 do ion-item, etc)

import { Api } from '../services/api';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
  standalone: true, 
  imports: [IonicModule, CommonModule, FormsModule] // <-- NÃO coloque o ApiService ou HttpClient aqui!
})

export class RelatorioPage {
  // Objeto que guarda tudo que é digitado no HTML
  dadosFormulario = {
    cracha_op: '',
    nome_operador: '',
    cod_equip: '',
    nome_equipamento: '',
    linha: '',
    hora_inicio: '',
    hora_fim: '',
    causa: '',
    cod_motivo: '',
    descricao: ''
  };

  categoriasMotivos = [
    {
      nome: '1 - QUEBRA',
      motivos: [
        { valor: '1.1', texto: '1.1 - Quebra fabricação' },
        { valor: '1.2', texto: '1.2 - Quebra maquinário' },
        { valor: '1.3', texto: '1.3 - Quebra forno' },
        { valor: '1.4', texto: '1.4 - Quebra empacotamento' },
        { valor: '1.5', texto: '1.5 - Quebra lona' }
      ]
    },
    {
      nome: '2 - SET UP',
      motivos: [
        { valor: '2.1', texto: '2.1 - Set-up formato' },
        { valor: '2.2', texto: '2.2 - Set-up produto' }
      ]
    },
    {
      nome: '3 - TROCA FERRAMENTAS',
      motivos: [
        { valor: '3.1', texto: '3.1 - Troca teflon' },
        { valor: '3.2', texto: '3.2 - Troca fundo' },
        { valor: '3.3', texto: '3.3 - Troca de bobina' },
        { valor: '3.4', texto: '3.4 - Troca data' }
      ]
    },
    {
      nome: '4 - PRODUÇÃO',
      motivos: [
        { valor: '4.1', texto: '4.1 - Início produção' },
        { valor: '4.2', texto: '4.2 - Fim da produção' }
      ]
    },
    {
      nome: '5 - PEQUENAS PARADAS',
      motivos: [
        { valor: '5.1', texto: '5.1 - Ajuste manutenção mecânica' },
        { valor: '5.2', texto: '5.2 - Ajuste manutenção elétrica' },
        { valor: '5.3', texto: '5.3 - Ajuste manutenção embalagem' },
        { valor: '5.4', texto: '5.4 - Ajuste Operacional' }
      ]
    },
    {
      nome: '6 - VELOCIDADE',
      motivos: [
        { valor: '6.1', texto: '6.1 - Absorção de bolha - Massa de corte' },
        { valor: '6.2', texto: '6.2 - Absorção de bolha - Máquina recheio' },
        { valor: '6.3', texto: '6.3 - Absorção de bolha - Máquina massa' },
        { valor: '6.4', texto: '6.4 - Absorção de bolha - Máquina molde' },
        { valor: '6.5', texto: '6.5 - Absorção de bolha - Carregador' },
        { valor: '6.6', texto: '6.6 - Absorção de bolha - SETUP' }
      ]
    },
    {
      nome: '7 - DEFEITO',
      motivos: [
        { valor: '7.1', texto: '7.1 - Peso leve' }
      ]
    },
    {
      nome: '8 - PROGRAMADA',
      motivos: [
        { valor: '8.1', texto: '8.1 - Falta demanda' },
        { valor: '8.2', texto: '8.2 - Preventiva' },
        { valor: '8.3', texto: '8.3 - Teste novo produto' },
        { valor: '8.4', texto: '8.4 - Treinamento' },
        { valor: '8.5', texto: '8.5 - Feriado' },
        { valor: '8.6', texto: '8.6 - Falta mão de obra' },
        { valor: '8.7', texto: '8.7 - Refeição' },
        { valor: '8.8', texto: '8.8 - Férias coletiva' }
      ]
    },
    {
      nome: '9 - GESTÃO',
      motivos: [
        { valor: '9.1', texto: '9.1 - Colaboração' },
        { valor: '9.2', texto: '9.2 - Falta ar comprimido' },
        { valor: '9.3', texto: '9.3 - Falta vapor' },
        { valor: '9.4', texto: '9.4 - Acidente' },
        { valor: '9.5', texto: '9.5 - Falta de insumos' },
        { valor: '9.6', texto: '9.6 - Reuniões não programadas' },
        { valor: '9.7', texto: '9.7 - Falta energia' }
      ]
    }
  ];

  motivosFiltrados: any[] = [];

  constructor(
    private apiService: Api,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  filtrarMotivos() {
    // Procura na lista principal a categoria que tem o mesmo nome selecionado
    const categoriaSelecionada = this.categoriasMotivos.find(
      (cat) => cat.nome === this.dadosFormulario.causa
    );

    if (categoriaSelecionada) {
      // Se achou, joga os motivos dela para a tela
      this.motivosFiltrados = categoriaSelecionada.motivos;
    } else {
      // Se não achou (ou limpou), esvazia a lista
      this.motivosFiltrados = [];
    }

    // Zera o motivo antigo para não enviar dados errados pro banco!
    this.dadosFormulario.cod_motivo = '';
  }

  // Busca o operador quando sai do campo "Crachá"
  buscarNomeOperador() {
    if (!this.dadosFormulario.cracha_op) return;

    this.apiService.buscarColaborador(this.dadosFormulario.cracha_op).subscribe({
      next: (resposta) => {
        this.dadosFormulario.nome_operador = resposta.nome;
      },
      error: () => {
        this.mostrarMensagem('Colaborador não encontrado!', 'danger');
        this.dadosFormulario.nome_operador = '';
      }
    });
  }

  // Busca a máquina e a linha quando sai do campo "Cód. Equipamento"
  buscarMaquina() {
    if (!this.dadosFormulario.cod_equip) return;

    this.apiService.buscarEquipamento(this.dadosFormulario.cod_equip).subscribe({
      next: (resposta) => {
        this.dadosFormulario.nome_equipamento = resposta.nome;
        this.dadosFormulario.linha = resposta.linha;
      },
      error: () => {
        this.mostrarMensagem('Equipamento não encontrado!', 'danger');
        this.dadosFormulario.nome_equipamento = '';
        this.dadosFormulario.linha = '';
      }
    });
  }

  // Envia os dados para o servidor Node.js
  async enviarRelatorio() {
    // Validação simples antes de enviar
    if (!this.dadosFormulario.cracha_op || !this.dadosFormulario.cod_equip) {
      this.mostrarMensagem('Preencha os campos obrigatórios!', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Salvando relatório...',
    });
    await loading.present();

    this.apiService.salvarRelatorio(this.dadosFormulario).subscribe({
      next: () => {
        loading.dismiss();
        this.mostrarMensagem('Relatório salvo com sucesso!', 'success');
        this.limparFormulario();
      },
      error: (erro) => {
        loading.dismiss();
        this.mostrarMensagem('Erro ao conectar com o servidor.', 'danger');
        console.error('Detalhe do erro:', erro);
      }
    });
  }

  // Função utilitária para os alertas nativos do Ionic
  async mostrarMensagem(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 3000,
      color: cor,
      position: 'top'
    });
    toast.present();
  }

  // Zera os campos após salvar
  limparFormulario() {
    this.dadosFormulario = {
      cracha_op: '', 
      nome_operador: '', 
      cod_equip: '', 
      nome_equipamento: '', 
      linha: '', 
      hora_inicio: '', 
      hora_fim: '', 
      causa: '', // <-- Essa foi a linha que o TypeScript sentiu falta!
      cod_motivo: '', 
      descricao: ''
    };
  }
}