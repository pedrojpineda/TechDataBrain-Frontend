import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../../Services/Users/user.service';
import { TaskService } from '../../../Services/ToDo/task.service';
import { StorageService } from '../../../Services/Users/storage.service'
import * as moment from 'moment';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  
  user;
  createTaskForm: FormGroup;
  allUsers;
  allTasks;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private userService: UserService,
    private taskService: TaskService,
    private router: Router
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.user = isAuth
      }
    )
    this.getUsers()
    this.validator()
  }

  public apiURL = this.taskService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }

  validator(){
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      user: ['', Validators.required],
      date: ['', [Validators.required, this.validateDateField]],
      description: ['', Validators.required],
      comments: [''],
    })
  }
  validateDateField(control: AbstractControl){
    console.log(control.value)
    const currentDate = moment( new Date(), 'YYYY-MM-DD' ).unix()
    const date = moment( control.value, 'YYYY-MM-DD' ).unix()
   
    if(currentDate > date){
      return { fechaPasado: true}
    }
  return null
  }

  getUsers(){
    this.userService.getAll().subscribe(
      (users)=>{
        this.allUsers = users
      },
      (error) => {
        console.error('Error: ', error)
      }
    )
  }

  saveTask(){
    if(this.createTaskForm.valid){
      this.taskService.createTask(this.createTaskForm.value).subscribe(
        (taskCreated) => {
          console.log(taskCreated)
          alert('Tarea creada exitosamente')
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
    this.taskService.getAll().subscribe(
      (tasks) => {
        console.log(tasks)
        this.allTasks = tasks
      }, (error) => {
        console.error('Error -> ', error)
      }
    )
  }

  removeTask(task){
    this.taskService.removeTask(task._id).subscribe(
      (deletedTask) => {
        console.log(deletedTask)
        alert('Tarea eliminada correctamente')
            this.getAll()
          },
          (error) => {
            console.error('Error al eliminar la tarea', error)
          }
      )
  }

  updateItem(task){
    localStorage.setItem(`task-${task._id}`, JSON.stringify(task))
    window.location.href = `/actualizar-tarea/${task._id}`
  }

  lookItem(task){
    localStorage.setItem(`task-${task._id}`, JSON.stringify(task))
    window.location.href = `/ver-tarea/${task._id}`
  }

}
