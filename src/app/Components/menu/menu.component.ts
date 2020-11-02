import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { StorageService } from '../../Services/Users/storage.service'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user;
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.user = isAuth
      }
    )
  }

  ngOnInit(): void {
  }

  cerrarSession(){
    this.storageService.removeToken();
    this.router.navigate(['/login'])
  }

}
