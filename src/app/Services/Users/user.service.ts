import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { User } from '../../Models/Users/User'
import { StorageService } from '../../Services/Users/storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://tech-data-brain.herokuapp.com'
  
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  prepareHeader(){
    return { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': `Bearer ${this.storageService.getToken()}`
    }) }
  }

  createUser(formData) {
    return this.http.post<User>(`${this.apiUrl}/user/create`, formData)
  }

  login(formData){
    return this.http.post<User>(`${this.apiUrl}/login`, formData)
  }

  updateUser(formData, id) {
    return this.http.put<User>(`${this.apiUrl}/user/update/${id}`, formData, this.prepareHeader())
  }

  getAll(){
    return this.http.get(`${this.apiUrl}/user/getAll`)
  }

  removeUser(id) {
    return this.http.delete(`${this.apiUrl}/user/delete/${id}`)
  }


}
