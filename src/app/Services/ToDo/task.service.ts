import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Task } from '../../Models/ToDo/Task'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = 'https://tech-data-brain.herokuapp.com'
  
  constructor(
    private http: HttpClient
  ) { }

  createTask(formData) {
    return this.http.post<Task>(`${this.apiUrl}/task/create`, formData)
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/task/getAll`)
  }

  updateTask(formData, id) {
    return this.http.put<Task>(`${this.apiUrl}/task/update/${id}`, formData)
  }

  removeTask(id) {
    return this.http.delete(`${this.apiUrl}/task/delete/${id}`)
  }
}
