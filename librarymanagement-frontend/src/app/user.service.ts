import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/api/v1/users";
  constructor(private httpClient:HttpClient) { console.log()}
  
  getUserList(): Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseURL}`);
  }

  createUser(user:User):Observable<object>{
    return this.httpClient.post(`${this.baseURL}`,user);
  }

  getUserByID(id: number):Observable<User>{
      return this.httpClient.get<User>(`${this.baseURL}/${id}`);
  }

  updateUser( id:number , user:User): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}` , user);
  }

  deleteUser( id:number ): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getUserByEmailPword(email: String,password: String):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/${email}/${password}`);
  }
}
 