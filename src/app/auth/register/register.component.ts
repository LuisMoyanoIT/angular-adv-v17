import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { userInterface } from '../../interfaces/user.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    name:  [ 'Nachotest', [Validators.required, Validators.minLength(3)] ],
    email: ['test003@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    password2: ['1234', Validators.required],
    terminos: [false, Validators.requiredTrue],

  }, {
    validators: this.equalsPassword('password', 'password2')
  } );

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService){
//[disabled]="registerForm.invalid"
  }

  createUser(){
    this.formSubmitted = true;

    if (this.registerForm.invalid) return;
    let user: userInterface = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.usuarioService.createUser(user).subscribe( resp =>{
      console.log("usuario creado");
      console.log(resp);
      //https://themesbrand.com/velzon/docs/angular/sweetalert2.html
      Swal.fire({
        title: 'Operación exitosa!',
        text: 'Usuario registrado!',
        icon: 'success',
        confirmButtonText: 'OK',
        buttonsStyling: false,
        
        customClass: {
            confirmButton: 'btn btn-primary px-4',
            cancelButton: 'btn btn-danger ms-2 px-4',
        
        },
        });
    }, (err) => {
      console.warn(err.error.message)
      Swal.fire({
        title: 'Error!',
        text: err.error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  unvalidField( campo: string ):boolean {
    if( this.registerForm.get( campo )?.invalid && this.formSubmitted){
      return true
    }
    return false
  }

  aceptTermsAndConditions(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  unvalidPassword()
  {
    if(this.registerForm.get('password')?.value === this.registerForm.get('password2')?.value){
      return false
    }else{
      return true
    }
  }

  equalsPassword(pass1: string, pass2: string)
  {
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value)
      {
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsIgual: true});
      }
    }
  }

}
