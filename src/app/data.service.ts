import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../app/employee';

@Injectable()
export class DataService {
  private url = "/api/employees";

  constructor(private http: HttpClient) {

  }

  getEmployees() {
    return this.http.get(this.url);
  }

  getEmployee(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createEmployee(employee: Employee) {
    return this.http.post(this.url, employee);
  }

  updateEmployee(employee: Employee) {
     
    return this.http.put(this.url + '/' + employee.id, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

}
