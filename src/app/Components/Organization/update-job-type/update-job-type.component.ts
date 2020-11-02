import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { JobTypeService } from '../../../Services/Organization/job-type.service';

@Component({
  selector: 'app-update-job-type',
  templateUrl: './update-job-type.component.html',
  styleUrls: ['./update-job-type.component.css']
})
export class UpdateJobTypeComponent implements OnInit {

  idJobType;
  dataJobType;  
  updateJobTypeForm: FormGroup
  allJobTypes;

  constructor(
    private formBuilder: FormBuilder,
    private jobTypeService: JobTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.idJobType = this.activatedRoute.snapshot.paramMap.get('id')
    let storageJobType = localStorage.getItem(`jobType-${this.idJobType}`)
    this.dataJobType = JSON.parse(storageJobType)
    this.validator()
  }

  public apiURL = this.jobTypeService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }

  validator() {
    this.updateJobTypeForm = this.formBuilder.group({
      jobType: [this.dataJobType.jobType, Validators.required]
    })
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

  updateJobType() {
    if(this.updateJobTypeForm.valid){
        this.jobTypeService.updateJobType(this.updateJobTypeForm.value, this.idJobType).subscribe(
          (jobTypeUpdated) => {
            console.log(jobTypeUpdated)
            alert('Tipo de vinculación actualizado correctamente')
            window.location.href = "/organizacion/administrar-tipos-vinculacion"
          },
          (error) => {
            console.error('Error al actualizar el tipo de vinculación', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }

  close(){
    window.location.href = "/organizacion/administrar-tipos-vinculacion"
  }
  
  }