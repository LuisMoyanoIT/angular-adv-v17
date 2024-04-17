import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { userInterface } from '../interfaces/user.interface';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
const api_url = environment.api_url;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //TODO: implementar servicio observable para actualizar la info en
  //los otros componentes

  public usuario: Usuario = {
    name: '',
    email: '',
    imageUrl: '',
    image: ''
  };

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

  editUser(data: {email:any, name: any})
  {
    const token = localStorage.getItem('token') || '';
    return this.http.put(`${api_url}/usuarios/${this.usuario?.uid}`, data, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        const {email ,google,image,name,  role, uid} = resp.usuario
        this.usuario = new Usuario(
          name,
          email,
          image,
          google,
          uid,
          role
        )
      }),
      catchError((err:any) => {
        Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })

        return of(false);
      } )
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
        const {email ,google,image,name,  role, uid} = resp.usuario
        this.usuario = new Usuario(
          name,
          email,
          image,
          google,
          uid,
          role
        )

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
