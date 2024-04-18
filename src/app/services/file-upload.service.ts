import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const api_url = environment.api_url;

@Injectable({
  providedIn: 'root'
})



export class FileUploadService {

  constructor(private http: HttpClient) { }

  updateFile(
    archivo: File , 
    tipo: 'usuarios' | 'medicos' | 'hospitales' | any,
    id: string
    )
  {
    console.log(archivo);
    console.log(tipo);
    console.log(id);
      const url = `${ api_url }/upload/${ tipo }/${ id }`;
      const formData =  new FormData();
      formData.append('imagen', archivo);


      return this.http.put(url, formData, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      })

 

  }
}
