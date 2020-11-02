import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { DepartmentService } from '../../../Services/Organization/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {

  idDepartment;
  dataDepartment;  
  updateDepartmentForm: FormGroup
  allDepartments;
  
  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.idDepartment = this.activatedRoute.snapshot.paramMap.get('id')
    let storageDepartment = localStorage.getItem(`department-${this.idDepartment}`)
    this.dataDepartment = JSON.parse(storageDepartment)
    this.validator()
  }

  public apiURL = this.departmentService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }
  
  validator() {
    this.updateDepartmentForm = this.formBuilder.group({
      department: [this.dataDepartment.department, Validators.required]
    })
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

  updateDepartment() {
    if(this.updateDepartmentForm.valid){
        this.departmentService.updateDepartment(this.updateDepartmentForm.value, this.idDepartment).subscribe(
          (departmentUpdated) => {
            console.log(departmentUpdated)
            alert('Dependencia actualizada correctamente')
            window.location.href = "/organizacion/administrar-dependencias"
          },
          (error) => {
            console.error('Error al actualizar la dependencia', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }

  close(){
    window.location.href = "/organizacion/administrar-dependencias"
  }

}
