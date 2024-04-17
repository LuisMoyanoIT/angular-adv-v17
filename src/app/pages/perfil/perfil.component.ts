import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  public perfilForm =  new FormGroup({
    name: new FormControl(),
    email: new FormControl()
});

  public usuario: any = {
    name: '',
    email: '',
    imageUrl: '',
    image: '',
    uid: ''
  };

  imageUpdated: any;

  public imageTemp : string  | null | ArrayBuffer = '';

  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
    ){

      this.perfilForm = this.formBuilder.group({
        name: [usuarioService.usuario?.name, Validators.required],
        email: [ usuarioService.usuario?.email, [Validators.required, Validators.email]],
      });

      this.usuario = usuarioService.usuario;
    }
  ngOnInit(): void {
    
  }

  updateProfile()
  {
    if(this.usuario.google)
    {
      //TODO: add simple validation in backend for google user
      Swal.fire({
        title: 'Error!',
        text: 'Los correos de google no se pueden editar',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })

      return;
    }
    let userEdited = {
      name: this.perfilForm.get('name')?.value,
      email: this.perfilForm.get('email')?.value
    }
    console.log(this.perfilForm.value);
    this.usuarioService.editUser(userEdited).subscribe(
      (resp:any) => {
        if(resp.ok)
        {
          console.log(resp);
        this.usuario.name = userEdited.name;
        this.usuario.email = userEdited.email;
        //TODO: implementar servicio observable para actualizar la info en
        //los otros componentes
        //window.location.reload();

        Swal.fire({
          title: 'Exito!',
          text: 'Perfil actualizado!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          }).then( (result:any) =>{
            if(result.value)
            {
              window.location.reload();
            }
          }  )
        }
        
      },
      
    )

  }

  updateUserImage(file: any)
  {
    this.imageUpdated = file;
    console.log(file);

    if(! file) return this.imageTemp = null;

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imageTemp = reader.result;
      console.log(reader.result);

    }

    return true;
  
  }

  uploadImage()
  {
    this.fileUploadService.updateFile( this.imageUpdated, 'usuarios', this.usuario.uid ).subscribe(
      (resp:any) =>{
        console.log(resp);
        this.usuario.image = resp.fileName;
        console.log(this.usuario);
        Swal.fire({
          title: 'Exito!',
          text: 'Perfil actualizado!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          })
      }, (err) => {
        console.warn(err.error.message)
        Swal.fire({
          title: 'Error!',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    )
  }

}
