import { Component , AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn')
  googleBtn!: ElementRef;
  
  public loginForm = this.formBuilder.group({
    email: [ (JSON.parse( localStorage.getItem('email') || '"email"') || ''), [Validators.required, Validators.email]],
    password: ['1234', Validators.required],
    remember: [false]
  });

  constructor(public router: Router,
              private formBuilder: FormBuilder,
              private usuarioService: UsuarioService){}
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "628899567091-mpevb5upin655jcjleq59jaauc4vv7b1.apps.googleusercontent.com",
      callback: (response:any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    //google.accounts.id.prompt(); // also display the One Tap dialog
  }

  handleCredentialResponse(response: any)
  {
     this.usuarioService.logingGoogle(response.credential).subscribe(
      (resp:any) =>{
      
        this.router.navigateByUrl("/");
      }
     )


  }
  
  login(){

    if (this.loginForm.invalid) return;
    
    let user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.usuarioService.loginUser(user).subscribe( resp =>{
      if(this.loginForm.get('remember')?.value)
      {
        let email: any = this.loginForm.get('email')?.value
        localStorage.setItem('email', JSON.stringify(email));
      }else{
        localStorage.removeItem('email')
      }
      //https://themesbrand.com/velzon/docs/angular/sweetalert2.html
      Swal.fire({
        title: 'Bienvenido!',
        text: 'login exitoso!',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        buttonsStyling: false,
        
        customClass: {
            confirmButton: 'btn btn-primary px-4',
            cancelButton: 'btn btn-danger ms-2 px-4',
        
        },
        });
        this.router.navigateByUrl("/");
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

}
