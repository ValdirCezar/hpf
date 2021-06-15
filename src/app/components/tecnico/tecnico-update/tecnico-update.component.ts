import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id:          '',
    nome:        '',
    cpf:         '',
    email:       '',
    senha:       '',
    perfis:      [],
    dataCriacao: '',
  }

  nome =  new FormControl(null, [Validators.minLength(3)]);
  cpf =       new FormControl(null, [Validators.required]);
  email =        new FormControl(null, [Validators.email]);
  senha = new FormControl(null, [Validators.minLength(3)]);

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
      response.perfis = []
      this.tecnico = response;
    })
  }

  update() {
    this.service.update(this.tecnico).subscribe(() => {
      this.message.message('Técnico atualizado com sucesso!');
      this.router.navigate(['../tecnicos']);
    }, err => {
      this.message.message(err.error.error);
    })
  }

  cancel(): void {
    this.router.navigate(['tecnicos'])
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
