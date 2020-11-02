import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { JobType } from '../../Models/Organization/JobType'

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  apiUrl = 'https://tech-data-brain.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  createJobType(formData) {
    return this.http.post<JobType>(`${this.apiUrl}/jobType/create`, formData)
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/jobType/getAll`)
  }

  updateJobType(formData, id) {
    return this.http.put<JobType>(`${this.apiUrl}/jobType/update/${id}`, formData)
  }

  removeJobType(id) {
    return this.http.delete(`${this.apiUrl}/jobType/delete/${id}`)
  }

}

