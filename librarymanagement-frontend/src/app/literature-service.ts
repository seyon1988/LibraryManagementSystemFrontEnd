import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Literature } from './literature';

@Injectable({
  providedIn: 'root'
})
export class LiteratureService {

  

    private baseURL = "http://localhost:8080/api/v1/literatures";
    constructor(private httpClient:HttpClient) { console.log('Constructor called'); }
    
    getLiteratureList(): Observable<Literature[]>{
      return this.httpClient.get<Literature[]>(`${this.baseURL}`);
    }
  
    createLiterature(literature:Literature):Observable<object>{
      return this.httpClient.post(`${this.baseURL}`,literature);
    }
  
    getLiteratureByID(id: number):Observable<Literature>{
        return this.httpClient.get<Literature>(`${this.baseURL}/${id}`);
    }
  
    updateLiterature( id:number , literature:Literature): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/${id}` , literature);
    }
  
    deleteLiterature( id:number ): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`);
    }
  
    getLiteratureByEmailPword(email: String,password: String):Observable<Literature>{
      return this.httpClient.get<Literature>(`${this.baseURL}/${email}/${password}`);
    }



}
