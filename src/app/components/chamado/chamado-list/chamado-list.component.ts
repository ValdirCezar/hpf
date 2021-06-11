import { ClienteService } from './../../../services/cliente.service';
import { TecnicoService } from './../../../services/tecnico.service';
import { MessageService } from './../../../services/message.service';
import { ChamadoService } from './../../../services/chamado.service';
import { Chamado } from './../../../models/chamado';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  chamados: Chamado[] = []

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'dataAbertura', 'prioridade', 'status', 'actions'];

  dataSource = new MatTableDataSource<Chamado>(this.chamados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ChamadoService,
    private clienteService: ClienteService,
    private message: MessageService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.service.findAll().subscribe(response => {
      this.chamados = response;
      this.listaCliente();

      this.dataSource = new MatTableDataSource<Chamado>(this.chamados);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.message.message(err.error.error);
    })
  }

  listaCliente(): void {
    this.chamados.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(response => {
        x.cliente = response.nome;
      })
    })
  }

  prioridade(x : String) {
    if(x == '0')
      return 'BAIXA'
    else if (x =='1')
      return 'MÉDIA'
    else
      return 'ALTA'
  }

  status(x : String) {
    if(x == '0')
      return 'ABERTO'
    else if (x =='1')
      return 'EM ANDAMENTO'
    else
      return 'ENCERRADO'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
