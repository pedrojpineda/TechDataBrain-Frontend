import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { DepartmentService } from '../../../Services/Organization/department.service';
import { StorageService } from '../../../Services/Users/storage.service'

@Component({
  selector: 'app-admin-departments',
  templateUrl: './admin-departments.component.html',
  styleUrls: ['./admin-departments.component.css']
})
export class AdminDepartmentsComponent implements OnInit {
  
  user;
  departmentForm: FormGroup
  allDepartments;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private departmentService: DepartmentService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.user = isAuth
      }
    )
    this.validator()
  }

  public apiURL = this.departmentService.apiUrl

  ngOnInit(): void {
    
    this.getAll()
  }

  validator() {
    this.departmentForm = this.formBuilder.group({
      department: ['', Validators.required]
    })
  }

  saveDepartment() {
    if(this.departmentForm.valid){
        this.departmentService.createDepartment(this.departmentForm.value).subscribe(
          (departmentCreated) => {
            console.log(departmentCreated)
            alert('Dependencia creada correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al crear la dependencia', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }
  
  getAll(){
    this.departmentService.getAll().subscribe(
      (departments) => {
        this.allDepartments = departments
      }, (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  removeDepartment(department){
    this.departmentService.removeDepartment(department._id).subscribe(
      (deletedDepartment) => {
        console.log(deletedDepartment)
        alert('Dependencia eliminada correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al eliminar la dependencia', error)
          }
      )
  }

  updateItem(department){
    localStorage.setItem(`department-${department._id}`, JSON.stringify(department))
    window.location.href = `organizacion/actualizar-dependencia/${department._id}`
  }
  
  }
