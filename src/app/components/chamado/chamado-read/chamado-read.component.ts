import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../../services/message.service';
import { ChamadoService } from 'src/app/services/chamado.service';
import { TecnicoService } from './../../../services/tecnico.service';
import { Validators, FormControl } from '@angular/forms';
import { ClienteService } from './../../../services/cliente.service';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  nomeDoTecnico: string = '';
  nomeDoCliente: string = '';

  chamado: Chamado = {
    prioridade: '',
    status:     '',
    titulo:     '',
    descricao:  '',
    tecnico:    '',
    cliente:    '',
  }

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private service:        ChamadoService,
    private messageService: MessageService,
    private route:          ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
    this.findById();
  }

  findById() {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.buscaTecnico();
      this.buscaCliente();
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

  retornaStatus() {
    if(this.chamado.status == 0) {
      return 'ABERTO'
    }

    if(this.chamado.status == 1) {
      return 'EM ANDAMENTO'
    }
    return 'ENCERRADO'
  }

  retornaPrioridade() {
    if(this.chamado.prioridade == 0) {
      return 'BAIXA'
    }
    
    if(this.chamado.prioridade == 1) {
      return 'MÉDIA'
    }
    return 'ALTA'
  }

  buscaTecnico() {
    this.tecnicoService.findById(this.chamado.tecnico).subscribe(
      resposta => {
        this.nomeDoTecnico = resposta.nome;
      }
    )
  }

  buscaCliente() {
    this.clienteService.findById(this.chamado.cliente).subscribe(
      resposta => {
        this.nomeDoCliente = resposta.nome;
      }
    )
  }

}
