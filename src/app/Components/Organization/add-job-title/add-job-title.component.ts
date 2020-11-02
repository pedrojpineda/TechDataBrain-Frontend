import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router'
import { JobTitleService } from '../../../Services/Organization/job-title.service';
import { StorageService } from '../../../Services/Users/storage.service'


@Component({
  selector: 'app-add-job-title',
  templateUrl: './add-job-title.component.html',
  styleUrls: ['./add-job-title.component.css']
})
export class AddJobTitleComponent implements OnInit {
  
  user;
  jobTitleForm: FormGroup
  allJobTitles;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private jobTitleService: JobTitleService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
    (isAuth) => {
      this.user = isAuth
    }
  )
    this.validator()
  }

  public apiURL = this.jobTitleService.apiUrl

  ngOnInit(): void {
    
    this.getAll()
  }

  validator() {
    this.jobTitleForm = this.formBuilder.group({
      jobTitle: ['', Validators.required]
    })
  }

  saveJobTitle() {
    if(this.jobTitleForm.valid){
        this.jobTitleService.createJobTitle(this.jobTitleForm.value).subscribe(
          (jobTitleCreated) => {
            console.log(jobTitleCreated)
            alert('Cargo creado correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al crear el cargo', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }
  
  getAll(){
    this.jobTitleService.getAll().subscribe(
      (jobTitles) => {
        this.allJobTitles = jobTitles
      }, (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  removeJobTitle(jobTitle){
    this.jobTitleService.removeJobTitle(jobTitle._id).subscribe(
      (deletedJobTitle) => {
        console.log(deletedJobTitle)
        alert('Cargo eliminado correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al eliminar el cargo', error)
          }
      )
  }

  updateItem(jobTitle){
    localStorage.setItem(`jobTitle-${jobTitle._id}`, JSON.stringify(jobTitle))
    window.location.href = `organizacion/actualizar-cargo/${jobTitle._id}`
  }
  
  }
