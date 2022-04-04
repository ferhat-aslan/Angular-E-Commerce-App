import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var Storeuser:any=localStorage.getItem("user");
      var storedNames = JSON.parse(Storeuser);
      //if a user data in the localstorage, then guard will allow
      if(localStorage.getItem("user")){
        this.router.navigate(['../home'])
        return false;

      }
      //if not, guard will redirect to login page.
      else{

        return true
      }
  }

}
