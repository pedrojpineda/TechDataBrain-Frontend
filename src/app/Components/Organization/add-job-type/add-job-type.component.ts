import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JobTypeService } from '../../../Services/Organization/job-type.service';
import { StorageService } from '../../../Services/Users/storage.service'

@Component({
  selector: 'app-add-job-type',
  templateUrl: './add-job-type.component.html',
  styleUrls: ['./add-job-type.component.css']
})
export class AddJobTypeComponent implements OnInit {

  jobTypeForm: FormGroup
  user;
  allJobTypes;

  constructor(
    private formBuilder: FormBuilder,
    private jobTypeService: JobTypeService,
    private storageService: StorageService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.user = isAuth
      }
    )
    this.validator()
  }

  public apiURL = this.jobTypeService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }

  validator() {
    this.jobTypeForm = this.formBuilder.group({
      jobType: ['', Validators.required]
    })
  }

  saveJobType() {
    if(this.jobTypeForm.valid){
        this.jobTypeService.createJobType(this.jobTypeForm.value).subscribe(
          (jobTypeCreated) => {
            console.log(jobTypeCreated)
            alert('Tipo de vinculación creado correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al crear el tipo de vinculación', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }

  getAll(){
    this.jobTypeService.getAll().subscribe(
      (jobTypes) => {
        this.allJobTypes = jobTypes
      }, (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  removeJobType(jobType){
    this.jobTypeService.removeJobType(jobType._id).subscribe(
      (deletedJobType) => {
        console.log(deletedJobType)
        alert('Cargo eliminado correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al eliminar el cargo', error)
          }
      )
  }

  updateItem(jobType){
    localStorage.setItem(`jobType-${jobType._id}`, JSON.stringify(jobType))
    window.location.href = `/organizacion/actualizar-tipo-vinculacion/${jobType._id}`
  }
  
  }