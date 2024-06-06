import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  condicoesAmbientais: Array<any> = [];

  filtros = {
    regiao: '',
    especies: '',
    statusConservacao: '',
    temperaturaAgua: '',
    PH: '',
    nivelPoluicao: ''
  }

  search() {
    this.http.get('https://fiap-3sis-gs-20241.azurewebsites.net/OceanData?pagina=1&qtde=5').subscribe((condicoesApi: any) => {
      console.log(condicoesApi)
    })
  }

  log(teste: any) {
    console.log(teste.target.value)
  }


}
