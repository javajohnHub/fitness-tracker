import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad{

  constructor(private auth: AuthService, private _router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (this.auth.isAuth()){
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }

  canLoad(route: Route){
    if (this.auth.isAuth()){
      return true;
    } else {
      this._router.navigate(['/login']);
    }
  }
}