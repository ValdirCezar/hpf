import { FormControl, Validators } from '@angular/forms';
import { MessageService } from './../../../services/message.service';
import { TecnicoService } from './../../../services/tecnico.service';
import { ClienteService } from './../../../services/cliente.service';
import { ChamadoService } from './../../../services/chamado.service';
import { Component, OnInit } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    descricao:   '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status:     FormControl = new FormControl(null, [Validators.required])
  titulo:     FormControl = new FormControl(null, [Validators.required])
  descricao:  FormControl = new FormControl(null, [Validators.required])
  tecnico:    FormControl = new FormControl(null, [Validators.required])
  cliente:    FormControl = new FormControl(null, [Validators.required])

  constructor(
    private service:        ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
  }

  create() {
    this.service.create(this.chamado).subscribe(() => {
      this.messageService.message('Chamado registrado com sucesso!');
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarClientes() {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarTecnicos() {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  validaCampos() {
    if (this.titulo.invalid || this.prioridade.invalid || this.status.invalid || this.tecnico.invalid
      || this.cliente.invalid || this.descricao.invalid) {
      return false;
    }
    return true;
  }

}
