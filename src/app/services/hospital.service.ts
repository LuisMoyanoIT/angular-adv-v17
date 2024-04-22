import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay, map } from 'rxjs';


const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient,) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getAllHospitals() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/hospitales`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      delay(1000)
    )

  }

  createHospital(body: {name: string, usuario: string})
  {
    return this.http.post(`${api_url}/hospitales`, body, {
      headers: {
        'x-token': this.token
      }})
  }

  editHospital(body: any, idHospital: string)
  {
    return this.http.put(`${api_url}/hospitales/${idHospital}`, body, {
      headers: {
        'x-token': this.token
      }})
  }

  deleteHospital(idHospital: string)
  {
    return this.http.delete(`${api_url}/hospitales/${idHospital}`, {
      headers: {
        'x-token': this.token
      }})
  }

}
