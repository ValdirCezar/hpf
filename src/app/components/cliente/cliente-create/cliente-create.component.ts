import { FormControl, Validators } from '@angular/forms';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
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
    private service: ClienteService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
  }

  create() {
    this.service.create(this.cliente).subscribe(response => {
      this.message.message('Técnico cadastrado com sucesso!!');
    }, err => {
      console.log(err);
      this.message.message(err.error.error);
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

  addPerfil(perfil: any): void {
    if (!this.cliente.perfis.includes(perfil))
      this.cliente.perfis.push(perfil)
    else
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1)
  }

  validaCampos(): boolean {
    if (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid && this.cliente.perfis.length > 0) {
      return true;
    }
    return false;
  }

}
