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

  linhasTable: Array<any> = [];

  filtros = {
    regiao: '',
    especie: '',
    statusConservacao: '',
    temperaturaAgua: '',
    PH: '',
    nivelPoluicao: '',
    pagina: 1
  }

  search() {
    this.linhasTable = [];

    this.http.get(`https://fiap-3sis-gs-20241.azurewebsites.net/OceanData?regiao=${this.filtros.regiao}&especie=${this.filtros.especie}&statusConservacao=${this.filtros.statusConservacao}&temperaturaMin=${this.filtros.temperaturaAgua}&temperaturaMax=${this.filtros.temperaturaAgua}&phMin=${this.filtros.PH}&phMax=${this.filtros.PH}&nivelPoluicao=${this.filtros.nivelPoluicao}&pagina=${this.filtros.pagina}&qtde=3`).subscribe((condicoesApi: any) => {

      condicoesApi.forEach((condicao: any) => {
        condicao.especies.forEach((condicaoEspecies: any) => {

          this.linhasTable.push({
            regiao: condicao.regiao,
            temperatura: condicao.temperaturaAgua,
            ph: condicao.pH,
            nivelPoluicao: condicao.nivelPoluicao,
            especieNome: condicaoEspecies.nome,
            especieStatus: condicaoEspecies.status,
          });


        })
      })
      console.log(this.linhasTable);

    })
  }


  log(teste: any) {
    console.log(teste.target.value)
  }


}
