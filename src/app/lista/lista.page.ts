import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router'; // Para fazer a navegação entre telas
import { addIcons } from 'ionicons';
import { add, warningOutline } from 'ionicons/icons'; // Ícones usados no HTML

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonicModule, CommonModule]
})
export class ListaPage implements OnInit {

 // Array que vai guardar os relatórios vindos da API
  relatorios: any[] = [];

  constructor(private router: Router) {
    // Registrando os ícones usados no HTML
    addIcons({ add, 'warning-outline': warningOutline });
  }

  // O ngOnInit roda assim que a tela abre
  ngOnInit() {
    this.carregarRelatoriosAbertos();
  }

  // ==========================================
  // FUNÇÃO PARA BUSCAR DADOS (SIMULAÇÃO)
  // ==========================================
  carregarRelatoriosAbertos() {
    // No futuro, isso será um this.http.get('sua-api/relatorios/abertos')...
    
    // Dados fictícios para você ver a tela funcionando:
    this.relatorios = [
      {
        id: 1,
        nome_equipamento: 'Máquina de Corte 01',
        linha: 'Linha A',
        lote: 'L10293',
        data_hora_inicio: new Date().toISOString(), // Data e hora atual
        status: 'ABERTO'
      },
      {
        id: 2,
        nome_equipamento: 'Forno Industrial B',
        linha: 'Linha B',
        lote: 'L10294',
        data_hora_inicio: new Date(Date.now() - 3600000).toISOString(), // 1 hora atrás
        status: 'ABERTO'
      }
    ];
  }

  // ==========================================
  // NAVEGAÇÃO: MANUTENTOR ABRE UM RELATÓRIO
  // ==========================================
  abrirRelatorio(id: number) {
    console.log('Abrindo relatório ID:', id);
    // Navega para a tela de formulário passando o ID pela URL
    // Ex: redireciona para /relatorio/1
    this.router.navigate(['/relatorio', id]); 
  }

  // ==========================================
  // NAVEGAÇÃO: OPERADOR CRIA NOVO RELATÓRIO
  // ==========================================
  novoRelatorio() {
    console.log('Criando novo relatório em branco');
    // Navega para a tela de formulário limpa
    this.router.navigate(['/relatorio']);
  }
}