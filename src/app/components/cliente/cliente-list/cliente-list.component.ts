import { ClienteService } from './../../../services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from './../../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  tecnicos: Cliente[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'action'];
  dataSource = new MatTableDataSource<Cliente>(this.tecnicos);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ClienteService ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() : void {
    this.service.findAll().subscribe(response => {
      this.tecnicos = response;
      console.log(this.tecnicos);
      this.dataSource = new MatTableDataSource<Cliente>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}