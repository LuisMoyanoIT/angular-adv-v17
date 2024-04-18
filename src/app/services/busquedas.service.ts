import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  searchByParameters(
    coleccion: 'usuarios' | 'medicos' | 'hospitales',
    parameter: string
    
    ) {
    return this.http.get(`${api_url}/busqueda/coleccion/${coleccion}/${parameter}`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const usuarios = resp.resultados.map((user:any) => new Usuario(
          user.name,
          user.email,
          user.image,
          user.google,
          user.uid,
          user.role
        ))
        return {
          usuarios
        };

      })
    )

  }
}
