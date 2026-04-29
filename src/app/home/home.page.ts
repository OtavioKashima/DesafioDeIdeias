import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// 1. Importe os componentes visuais do Ionic aqui
import { IonContent, IonIcon } from '@ionic/angular/standalone'; 

import { addIcons } from 'ionicons';
import { chevronForward, documentText, build, statsChart } from 'ionicons/icons';
// Importe o CommonModule caso precise usar *ngIf ou *ngFor depois
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // 2. Garante que a página funciona de forma independente
  imports: [IonContent, IonIcon, CommonModule], // 3. Declara as tags que usamos no HTML
})
export class HomePage implements OnInit {
  saudacao: string = '';
  dataAtual: string = '';

  constructor(private router: Router) {
    addIcons({ 
      'chevron-forward': chevronForward, 
      'document-text': documentText, 
      'build': build, 
      'stats-chart': statsChart 
    });
  }

  ngOnInit() {
    this.configurarSaudacaoEData();
  }

  configurarSaudacaoEData() {
    const hora = new Date().getHours();
    
    if (hora >= 5 && hora < 12) {
      this.saudacao = 'Bom dia';
    } else if (hora >= 12 && hora < 18) {
      this.saudacao = 'Boa tarde';
    } else {
      this.saudacao = 'Boa noite';
    }

    const opcoes: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    this.dataAtual = new Date().toLocaleDateString('pt-BR', opcoes);
  }

  navegar(rota: string) {
    this.router.navigate([rota]);
  }
}