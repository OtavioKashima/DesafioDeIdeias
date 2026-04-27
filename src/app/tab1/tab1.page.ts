import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Api } from '../services/api';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {

  users: any[] = [];

  constructor(private apiService: Api) { }
  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log('Dados recebidos:', res);
      },
      error: (err) => console.error('Erro na requisição:', err)
    });
  }
}
