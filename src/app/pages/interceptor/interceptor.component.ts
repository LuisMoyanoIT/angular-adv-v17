import { Component } from '@angular/core';
import { InterceptorService } from '../../services/interceptor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-interceptor',
  templateUrl: './interceptor.component.html',
  styleUrl: './interceptor.component.css'
})
export class InterceptorComponent {

  constructor(public interceptorService: InterceptorService)
  {
    this.interceptorService.getAllUsers(0).subscribe(
      (resp:any) => {
        console.log(resp);
      },
      (err) => {
        Swal.fire({
          title: 'Error!',
          text: err,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    )
  }



}
