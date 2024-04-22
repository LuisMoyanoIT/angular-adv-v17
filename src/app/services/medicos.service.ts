import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private http: HttpClient,) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  getAllMedicos() {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/medicos`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      delay(1000)
    )

  }

  getMedicoById(MedicoId: string | undefined) {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/medicos/${MedicoId}`, {
      headers: {
        'x-token': token
      }
    })

  }


  deleteMedico(idMedico: string)
  {
    return this.http.delete(`${api_url}/medicos/${idMedico}`, {
      headers: {
        'x-token': this.token
      }})
  }

  createMedico(body: {name: string, usuario: string, hospital: string})
  {
    return this.http.post(`${api_url}/medicos`, body, {
      headers: {
        'x-token': this.token
      }})
  }

  editMedico(body: any, idMedico: string)
  {
    return this.http.put(`${api_url}/medicos/${idMedico}`, body, {
      headers: {
        'x-token': this.token
      }})
  }

}
