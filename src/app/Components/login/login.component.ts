import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../Services/Users/user.service'
import { StorageService } from '../../Services/Users/storage.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.validate()
   }

  ngOnInit(): void {
  }

  validate(){
    this.loginForm = this.FormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value).subscribe(
        (dataUser) => {
          this.storageService.saveToken(dataUser['token'])
          window.location.href = "/"
        },
        (error) => {
          console.error('Error ->', error)
        }
      )
    } else {
        alert('Los campos no están correctos')
    }
  }

}