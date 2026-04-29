import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RelatorioPage {
  aba = 'operador';

  // Objeto completo com todos os campos requisitados
  form: any = {
    // Campos Operador
    linha: '',
    lote: '',
    cracha_op: '',
    nome_op: '',
    cod_equip: '',
    nome_equip: '',
    data_inicio: '',
    data_fim: '',
    hora_inicio: '',
    hora_fim: '',
    cod_motivo: '',
    cod_parada: '',
    descricao: '',

    // Campos Manutentor
    cracha_manu1: '',
    nome_manu1: '',
    cracha_manu2: '',
    nome_manu2: '',
    cracha_manu3: '',
    nome_manu3: '',
    tarefa: '',
    motivo_manu: '',
    causa: '',
    area: ''
  };

  constructor() { }

  // Dispara automaticamente assim que a tela abre
  ngOnInit() {
    const { data, hora } = this.obterDataHoraAtual();
    this.form.data_inicio = data;
    this.form.hora_inicio = hora;
  }

  // Função auxiliar para formatar a data e hora local do aparelho
  obterDataHoraAtual() {
    const agora = new Date();

    // Formata YYYY-MM-DD
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const dia = String(agora.getDate()).padStart(2, '0');

    // Formata HH:MM
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    return {
      data: `${ano}-${mes}-${dia}`,
      hora: `${horas}:${minutos}`
    };
  }

  buscaColaborador(tipo: string) {
    // Simulação do GET na API para buscar nomes por crachá
    if (tipo === 'op' && this.form.cracha_op) {
      this.form.nome_op = 'Operador Exemplo';
    } else if (tipo === 'manu1' && this.form.cracha_manu1) {
      this.form.nome_manu1 = 'Técnico Principal';
    } else if (tipo === 'manu2' && this.form.cracha_manu2) {
      this.form.nome_manu2 = 'Ajudante Um';
    } else if (tipo === 'manu3' && this.form.cracha_manu3) {
      this.form.nome_manu3 = 'Ajudante Dois';
    }
  }

  buscaEquipamento() {
    if (this.form.cod_equip) {
      this.form.nome_equip = 'Forno Linha A';
    }
  }

  gravarVideo() {
    console.log('Abrindo plugin de câmera/vídeo nativo...');
  }

  salvar() {
    // No exato momento em que ele clica em salvar, registramos o FIM
    const { data, hora } = this.obterDataHoraAtual();
    this.form.data_fim = data;
    this.form.hora_fim = hora;

    console.log('JSON completo pronto para o Node.js:', this.form);
  }
}