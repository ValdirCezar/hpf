import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

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

  constructor(
    private router: Router,
    private service: TecnicoService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.service.create(this.tecnico).subscribe(response => {
      this.message.message('Técnico cadastrado com sucesso!!');
    }, err => {
      console.log(err);
      this.message.message(err.error.error);
    })
  }

  cancel(): void {
    this.router.navigate([''])
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
