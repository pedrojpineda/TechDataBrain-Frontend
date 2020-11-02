import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private auth = new BehaviorSubject<{}>(null);
  auth$ = this.auth.asObservable();

  constructor() { 
    this.auth.next(this.dataUser())
  }

  saveToken(token){
    console.log('token');
    localStorage.setItem('tokenUser', token);
    this.auth.next(this.dataUser())
  }

  getToken(){
    return localStorage.getItem('tokenUser');
  }

  removeToken(){
    localStorage.removeItem('tokenUser');
    this.auth.next(null)
  }

  dataUser(){
    const token = this.getToken();
    if(!token){
      return null;
    }
    let urlBase64 = token.split('.')[1]
    let b64 = urlBase64.replace('-', '+').replace('_', '/')
    return JSON.parse(this.decodeData(b64))
  }
  decodeData(b64){
    return decodeURIComponent(atob(b64).split('').map(
      function(char){
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
      }
    ).join(''))
  }

}

