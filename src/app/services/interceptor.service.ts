import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private http: HttpClient) { }


  
  getAllUsers(desde: number) {
 
    return this.http.get(`${api_url}/usuarioss`).pipe(
      map( (resp:any) => resp.usuarios)
    )
  }

 
}
