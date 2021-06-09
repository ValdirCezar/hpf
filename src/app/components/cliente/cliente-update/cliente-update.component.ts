import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

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
    private message: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.cliente.id).subscribe(response => {
      response.perfis = []
      this.cliente = response;
    })
  }

  update() {
    this.service.update(this.cliente).subscribe(() => {
      this.message.message('Cliente atualizado com sucesso!');
      this.router.navigate(['../clientes']);
    }, err => {
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
