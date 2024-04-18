import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{

  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public loadingUsers: boolean = false;

  public Currentuser: any = {
    name: '',
    email: '',
    imageUrl: '',
    image: '',
    uid: '',
    role: ''
  };


  constructor(private usuarioService : UsuarioService,
              private busquedasService: BusquedasService,
              private modalImagenService: ModalImagenService  )
  {
    this.Currentuser = usuarioService.usuario;
  }
  ngOnInit(): void {
    this.getAllUsers();
    //this.searchByParameters();
  }

  getAllUsers()
  {
    this.loadingUsers = true;
    this.usuarioService.getAllUsers(this.desde).subscribe(
      (resp:any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.usuariosTemp = resp.usuarios;
        this.totalUsuarios = resp.totalUsuarios;
        this.loadingUsers = false;
      }
    )
  }

  getMoreOrLessUsers(number: number)
  {
    this.desde += number;
    if( this.desde < 0 )
    {
      this.desde = 0;
      console.log("not moving forward")
    }else if (this.desde > this.totalUsuarios)
    {
      this.desde -= number;
    }
    console.log(this.desde);
    console.log(this.totalUsuarios);
    this.getAllUsers();
  }

  searchByParameters(parametroBusqueda:any):void
  {
    if(parametroBusqueda === ''){
      this.usuarios = this.usuariosTemp;
      return; 
    };
    console.log(parametroBusqueda)
    this.busquedasService.searchByParameters('usuarios', parametroBusqueda).subscribe(
      (resp:any) =>{
        this.usuarios = [];
        console.log(resp);
        return this.usuarios = resp.usuarios;
      }
    )
  }

  deleteSelectedUser(usuario: Usuario)
  {
    if(this.Currentuser.uid === usuario.uid)
    {
      Swal.fire({
        title: 'Error!',
        text: "no te puedes borrar a ti pelotudo",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })

      return;

    }
    Swal.fire({
      title: "Deseas eliminar al usuario?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(usuario.uid).subscribe( 
          (resp: any) => {
            Swal.fire("Eliminado!", "", "success");
            this.getAllUsers();
          },
          (err) => {
            console.warn(err.error.message)
            Swal.fire({
              title: 'Error!',
              text: err.error.message,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          }
        )
      } else if (result.isDenied) {
        Swal.fire("Cambios no efectuados", "", "info");
      }
    });
    
  }

  changeUserRole(usuario: any)
  {
    if(this.Currentuser.role === 'USER_ROLE')
    {
      Swal.fire({
        title: 'Error!',
        text: "Permiso denegado!!!1",
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })

      return;

    }
    this.usuarioService.editUser(usuario, 'otherUser').subscribe(
      (resp:any) => {
          console.log(resp);
        //TODO: implementar servicio observable para actualizar la info en
        //los otros componentes
        //window.location.reload();
        Swal.fire({
          title: 'Exito!',
          text: 'Rol actualizado!',
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
              //window.location.reload();
            }
          }  )
        
        
      },
      (err) => {
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

  showModal(usuario: Usuario)
  {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.image);
  }

  

}
