import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { userInterface } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

const api_url = environment.api_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,
    public router: Router) { }


  createUser(body: userInterface)
  {
    return this.http.post(`${api_url}/usuarios`, body).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      })
)
  }

  loginUser(body: any)
  {
    return this.http.post(`${api_url}/login`, body).pipe(
                                                  tap( (resp:any) => {
                                                    localStorage.setItem('token', resp.token);
                                                  })
    )
  }

  logingGoogle( token:string )
  {
    return this.http.post(`${api_url}/login/google`, {token}).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }))
  }

  validateUserToken()
  {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${api_url}/login/renew`,{
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
         catchError(error => of(false))
      
      )
  }

  logout()
  {
    localStorage.removeItem('token');
    google.accounts.id.revoke( 'luismocru@gmail.com', ()=>{
      this.router.navigateByUrl("/login");
    })
  }


}
