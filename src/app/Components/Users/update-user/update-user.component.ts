import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../Services/Organization/department.service';
import { JobTypeService } from '../../../Services/Organization/job-type.service';
import { JobTitleService } from '../../../Services/Organization/job-title.service';
import { UserService } from '../../../Services/Users/user.service';
import { StorageService } from '../../../Services/Users/storage.service'
import * as moment from 'moment';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  
  user;
  idUser;
  userData;
  updateUserForm: FormGroup;
  allDepartments;
  allJobTypes;
  allJobTitles;
  allUsers;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private jobTypeService: JobTypeService,
    private jobTitleService: JobTitleService,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.storageService.auth$.subscribe(
        (isAuth) => {
          this.user = isAuth
        }
      )
      this.idUser = this.activatedRoute.snapshot.paramMap.get('id')
    let storageUser = localStorage.getItem(`user-${this.idUser}`)
    this.userData = JSON.parse(storageUser)
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
    const date = moment(this.userData.birthday).add('1','day').format('YYYY-MM-DD')
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      role: [this.userData.role, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      password: [this.userData.password, [Validators.required, Validators.minLength(6)]],
      idNumber: [this.userData.idNumber, Validators.required],
      birthday: [date, [Validators.required, this.validateBirthdayField]],
      gender: [this.userData.gender, Validators.required],
      civilStatus: [this.userData.civilStatus, Validators.required],
      workPhone: [this.userData.workPhone, Validators.required],
      homePhone: [this.userData.homePhone, Validators.required],
      cellphone: [this.userData.cellphone, Validators.required],
      personalEmail: [this.userData.personalEmail, [Validators.required, Validators.email]],
      homeAddress: [this.userData.homeAddress, Validators.required],
      city: [this.userData.city, Validators.required],
      jobType: [this.userData.jobType, Validators.required],
      jobTitle: [this.userData.jobTitle, Validators.required],
      department: [this.userData.department, Validators.required],
      leader: [this.userData.leader, Validators.required]
    })
  }

  validateBirthdayField(control: AbstractControl){
    console.log(control.value)
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

  updateUser(){
    if(this.updateUserForm.valid){
      this.userService.updateUser(this.updateUserForm.value, this.idUser).subscribe(
        (userUpdated) => {
          console.log(userUpdated)
          alert('Usuario actualizado exitosamente')
          window.location.href = "/usuarios/administrar-usuarios"
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    } else {
      alert('Todos los campos deben estar llenos')
    }
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

  close(){
    window.location.href = "usuarios/administrar-usuarios"
  }

}