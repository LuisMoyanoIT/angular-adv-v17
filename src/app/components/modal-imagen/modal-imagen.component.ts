import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {

  public ocultarModal: boolean = false;
  imageUpdated: any;

  public imageTemp : string  | null | ArrayBuffer = '';

  constructor(public modalImagenService: ModalImagenService,
              private fileUploadService: FileUploadService)
  {

  }

  closeModal()
  {
    this.imageTemp = null;
    this.modalImagenService.cerrarModal();
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

  saveImage(){
    this.fileUploadService.updateFile( 
      this.imageUpdated, 
      this.modalImagenService.tipo, 
      this.modalImagenService.id ).subscribe(
      (resp:any) =>{
        console.log(resp);
        this.closeModal();
 
        Swal.fire({
          title: 'Exito!',
          text: 'Imagen actualizada!',
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
