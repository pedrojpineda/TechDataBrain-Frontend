import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { JobTitleService } from '../../../Services/Organization/job-title.service';

@Component({
  selector: 'app-update-job-title',
  templateUrl: './update-job-title.component.html',
  styleUrls: ['./update-job-title.component.css']
})
export class UpdateJobTitleComponent implements OnInit {

  idJobTitle;
  dataJobTitle;  
  updateJobTitleForm: FormGroup
  allJobTitles;
  
  constructor(
    private formBuilder: FormBuilder,
    private jobTitleService: JobTitleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.idJobTitle = this.activatedRoute.snapshot.paramMap.get('id')
    let storageJobTitle = localStorage.getItem(`jobTitle-${this.idJobTitle}`)
    this.dataJobTitle = JSON.parse(storageJobTitle)
    this.validator()
  }

  public apiURL = this.jobTitleService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }
  
  validator() {
    this.updateJobTitleForm = this.formBuilder.group({
      jobTitle: [this.dataJobTitle.jobTitle, Validators.required]
    })
  }

  getAll(){
    this.jobTitleService.getAll().subscribe(
      (jobTitle) => {
        this.allJobTitles = jobTitle
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

  updateJobTitle() {
    if(this.updateJobTitleForm.valid){
        this.jobTitleService.updateJobTitle(this.updateJobTitleForm.value, this.idJobTitle).subscribe(
          (jobTitleUpdated) => {
            console.log(jobTitleUpdated)
            alert('Cargo actualizado correctamente')
            window.location.href = "/organizacion/administrar-cargos"
          },
          (error) => {
            console.error('Error al actualizar el cargo', error)
          }
        )
    } else {
      alert('Se deben llenar todos los campos')
    }
  }
    
  close(){
    window.location.href = "/organizacion/administrar-cargos"
  }

}

