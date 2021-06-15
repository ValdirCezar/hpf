import { MessageService } from './../services/message.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router:                 Router, 
    private service:           AuthService, 
    private messageService: MessageService,
    ){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const authenticated = this.service.isAuthenticated();
    if(authenticated) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
