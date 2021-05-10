import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lend } from './lend';

@Injectable({
  providedIn: 'root'
})
export class LendService {

  private baseURL = "http://localhost:8080/api/v1/lends";
  
  constructor(private httpClient:HttpClient) { console.log('Constructor called'); }
  
  getLendList(): Observable<Lend[]>{
    return this.httpClient.get<Lend[]>(`${this.baseURL}`);
  }

  createLend(lend:Lend):Observable<object>{
    return this.httpClient.post(`${this.baseURL}`,lend);
  }

  getLendByID(id: number):Observable<Lend>{
      return this.httpClient.get<Lend>(`${this.baseURL}/${id}`);
  }

  updateLend( id:number , lend:Lend): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}` , lend);
  }

  deleteLend( id:number ): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }


  getLendByUserID(userID: String):Observable<Lend>{
    return this.httpClient.get<Lend>(`${this.baseURL}/'byuserid'/${userID}`);
  }
}
 