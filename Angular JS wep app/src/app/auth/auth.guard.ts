import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url:string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean{
    if(this.apiService.IsAdminLoggedIn()){
      return true;
    }

    this.router.navigate(["/player-rankings"]);
  }
  
}
