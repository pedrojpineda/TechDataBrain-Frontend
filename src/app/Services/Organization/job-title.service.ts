import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { JobTitle } from '../../Models/Organization/JobTitle'

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  apiUrl = 'https://tech-data-brain.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  createJobTitle(formData) {
    return this.http.post<JobTitle>(`${this.apiUrl}/jobTitle/create`, formData)
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/jobTitle/getAll`)
  }

  updateJobTitle(formData, id) {
    return this.http.put<JobTitle>(`${this.apiUrl}/jobTitle/update/${id}`, formData)
  }

  removeJobTitle(id) {
    return this.http.delete(`${this.apiUrl}/jobTitle/delete/${id}`)
  }

}