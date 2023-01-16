import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getData(){
    return this.httpclient.get('http://localhost:8000/api/users/');
  }

  insertData(data:any){
    return this.httpclient.post('http://localhost:8000/api/users/',data);
  }

  deleteData(id:any) {
    return this.httpclient.delete('http://localhost:8000/api/users/'+id);
  }

  getEmployeeByID(id:any){
    return this.httpclient.get('http://localhost:8000/api/users/'+id);
  }

  updateData(id:any,data:any){
    return this.httpclient.put('http://localhost:8000/api/users/'+id, JSON.stringify(data),this.httpOptions);
  }
}
