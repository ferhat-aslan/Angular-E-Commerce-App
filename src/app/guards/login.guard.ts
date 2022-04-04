import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//A guard has been defined for unauthorized page transitions.
export class LoginGuard implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    var Storeuser:any=localStorage.getItem("user");
    var storedNames = JSON.parse(Storeuser);
    //if a user data in the localstorage, then guard will allow
    if(storedNames){

      return true;
    }
    //if not, guard will redirect to login page.
    else{
      this.router.navigate(['login'])
      return false
    }
  }

}
