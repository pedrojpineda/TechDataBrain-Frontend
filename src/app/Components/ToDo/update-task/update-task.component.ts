import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Services/Users/user.service';
import { TaskService } from '../../../Services/ToDo/task.service';
import { StorageService } from '../../../Services/Users/storage.service'
import * as moment from 'moment';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  user;
  idTask
  dataTask;
  updateTaskForm: FormGroup;
  allUsers;
  allTasks;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.storageService.auth$.subscribe(
      (isAuth) => {
        this.user = isAuth
      }
    )
    this.idTask = this.activatedRoute.snapshot.paramMap.get('id')
    let storageTask = localStorage.getItem(`task-${this.idTask}`)
    this.dataTask = JSON.parse(storageTask)
    this.getUsers()
    this.validator()
  }

  public apiURL = this.taskService.apiUrl

  ngOnInit(): void {
    this.getAll()
  }

  validator(){
    const date = moment(this.dataTask.date).add('1','day').format('YYYY-MM-DD')
    this.updateTaskForm = this.formBuilder.group({
      title: [this.dataTask.title, Validators.required],
      user: [this.dataTask.user, Validators.required],
      date: [date, [Validators.required, this.validateDateField]],
      description: [this.dataTask.description, Validators.required],
      comments: [this.dataTask.comments],
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

  updateTask(){
    if(this.updateTaskForm.valid){
      this.taskService.updateTask(this.updateTaskForm.value, this.idTask).subscribe(
        (taskUpdated) => {
          console.log(taskUpdated)
          alert('Tarea actualizada exitosamente')
          window.location.href = "/administrar-tareas"
        },
        (error) => {
          console.error('Error: ', error)
        }
      )
    } else {
      alert('Todos los campos deben estar llenos')
    }
  }

  close(){
    window.location.href = "/administrar-tareas"
  }

}
