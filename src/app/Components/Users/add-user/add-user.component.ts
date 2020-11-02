import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { DepartmentService } from '../../../Services/Organization/department.service';
import { JobTypeService } from '../../../Services/Organization/job-type.service';
import { JobTitleService } from '../../../Services/Organization/job-title.service';
import { UserService } from '../../../Services/Users/user.service';
import { StorageService } from '../../../Services/Users/storage.service'
import * as moment from 'moment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userLogged;
  createUserForm: FormGroup;
  allDepartments;
  allJobTypes;
  allJobTitles;
  allUsers;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private departmentService: DepartmentService,
    private jobTypeService: JobTypeService,
    private jobTitleService: JobTitleService,
    private userService: UserService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.userLogged = isAuth
      }
    )
    this.getDepartments()
    this.getJobTitles()
    this.getJobTypes()
    this.validator()
  }

  public apiURL = this.userService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }

  validator(){
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      idNumber: ['', Validators.required],
      birthday: ['', [Validators.required, this.validateBirthdayField]],
      gender: ['', Validators.required],
      civilStatus: ['', Validators.required],
      workPhone: ['', Validators.required],
      homePhone: ['', Validators.required],
      cellphone: ['', Validators.required],
      personalEmail: ['', [Validators.required, Validators.email]],
      homeAddress: ['', Validators.required],
      city: ['', Validators.required],
      jobType: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      leader: ['', Validators.required]
    })
  }

  validateBirthdayField(control: AbstractControl){
    const currentDate = moment( new Date(), 'YYYY-MM-DD' ).unix()
    const birthday = moment( control.value, 'YYYY-MM-DD' ).unix()
    const menorEdad = moment( new Date(), 'YYYY-MM-DD' ).subtract('18','years').unix()
   
    if(currentDate < birthday){
      return { fechaFuturo: true}
    }
    
    if(menorEdad < birthday){
      return { menorEdad: true}
    }
    return null
  }
 
  getDepartments(){
    this.departmentService.getAll().subscribe(
      (departments) => {
        this.allDepartments = departments
        console.log(this.allDepartments)
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  getJobTypes(){
    this.jobTypeService.getAll().subscribe(
      (jobTypes) => {
        this.allJobTypes = jobTypes
        console.log(this.allJobTypes)
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  getJobTitles(){
    this.jobTitleService.getAll().subscribe(
      (jobTitles) => {
        this.allJobTitles = jobTitles
        console.log(this.allJobTitles)
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  saveUser(){
    if(this.createUserForm.valid){
      this.userService.createUser(this.createUserForm.value).subscribe(
        (userCreated) => {
          console.log(userCreated)
          alert('Usuario creado exitosamente')
          this.getAll()
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    } else {
      alert('Todos los campos deben estar llenos')
    }
  }

  getAll(){
    this.userService.getAll().subscribe(
      (users) => {
        console.log(users)
        this.allUsers = users
      }, (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  removeUser(user){
    this.userService.removeUser(user._id).subscribe(
      (deletedUser) => {
        console.log(deletedUser)
        alert('Usuario eliminado correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al eliminar el usuario', error)
          }
      )
  }

  updateItem(user){
    localStorage.setItem(`user-${user._id}`, JSON.stringify(user))
    window.location.href = `/usuarios/actualizar-usuario/${user._id}`
  }
  

}