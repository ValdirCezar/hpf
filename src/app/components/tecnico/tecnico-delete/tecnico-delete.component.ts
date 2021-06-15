import { TecnicoService } from './../../../services/tecnico.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { Tecnico } from 'src/app/models/tecnico';
@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id:          '',
    nome:        '',
    cpf:         '',
    email:       '',
    senha:       '',
    perfis:      [],
    dataCriacao: '',
  }

  constructor(
    private router:          Router,
    private service: TecnicoService,
    private message: MessageService,
    private route:   ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById() {
    this.service.findById(this.tecnico.id).subscribe(response => {
      this.tecnico = response;
    })
  }

  delete() {
    this.service.delete(this.tecnico.id).subscribe(() => {
      this.router.navigate(['../tecnicos']);
      this.message.message("Técnico removido com sucesso");
    }, err => {
      this.message.message(err.error.error);
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos']);
  }

}
