import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-edit',
  templateUrl: './chamado-edit.component.html',
  styleUrls: ['./chamado-edit.component.css']
})
export class ChamadoEditComponent implements OnInit {

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  nomeDoTecnico: string = ''
  nomeDoCliente: string = ''

  chamado: Chamado = {
    prioridade: '',
    status:     '',
    titulo:     '',
    descricao:  '',
    tecnico:    '',
    cliente:    '',
  }

  titulo:     FormControl = new FormControl(null, [Validators.required])
  descricao:  FormControl = new FormControl(null, [Validators.required])

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

  update() {
    this.service.update(this.chamado).subscribe(() => {
      this.messageService.message('Chamado atualizado com sucesso!');
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
    if (this.titulo.invalid  || this.descricao.invalid) {
      return false;
    }
    return true;
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
