import { MessageService } from './../../../services/message.service';
import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

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
      console.log(response.senha);
      this.cliente = response;
    })
  }

  delete() {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.router.navigate(['../clientes']);
      this.message.message("Cliente removido com sucesso");
    }, err => {
      this.message.message(err.error.error);
    })
  }

  cancel(): void {
    this.router.navigate(['clientes'])
  }

}
