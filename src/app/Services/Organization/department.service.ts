import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Department } from '../../Models/Organization/Department'

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  apiUrl = 'https://tech-data-brain.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  createDepartment(formData) {
    return this.http.post<Department>(`${this.apiUrl}/department/create`, formData)
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/department/getAll`)
  }

  updateDepartment(formData, id) {
    return this.http.put<Department>(`${this.apiUrl}/department/update/${id}`, formData)
  }
  
  removeDepartment(id) {
    return this.http.delete(`${this.apiUrl}/department/delete/${id}`)
  }
  

}
