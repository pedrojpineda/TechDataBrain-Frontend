import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../Services/Users/storage.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private storage: StorageService,
    private router: Router
    ){}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.storage.getToken() != null){
      if(this.isAdmin(route.data.only) || this.isDirectivo(route.data.only)){
        return true
      } else {
        this.router.navigate(['/'])
        return true;
      }
    }
      this.router.navigate(['/login'])
      return false
    }
      
      isAdmin(onlyParams){
        const infoUser = this.storage.dataUser()
        if( (infoUser.role == 'Admin' && onlyParams == 'Admin' || !onlyParams) ){
          return true
        }
        return false
      }

      isDirectivo(onlyParams){
        const infoUser = this.storage.dataUser()
        if( (infoUser.jobTitle == '5f83ad587c4f0272ec664b80' && onlyParams == 'Directivo' || !onlyParams) ){
          return true
        }
        return false
      }
  }