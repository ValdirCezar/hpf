import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/chamados/create'])
  }

  logout() {
    this.storage.setLocalUser(null);
    this.router.navigate(['login'])
  }

}
