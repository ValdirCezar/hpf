import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome = new FormControl(null, [Validators.minLength(3)])
  cpf = new FormControl(null, [Validators.required])
  email = new FormControl(null, [Validators.email])
  senha = new FormControl(null, [Validators.minLength(3)])

  constructor() { }

  ngOnInit(): void {
  }

  addPerfil(perfil: any): void {
    if (!this.tecnico.perfis.includes(perfil))
      this.tecnico.perfis.push(perfil)
    else
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
  }

  validaCampos(): boolean {
    if (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid && this.tecnico.perfis.length > 0) {
      return true;
    }
    return false;
  }

}
