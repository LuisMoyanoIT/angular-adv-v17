import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrl: './hospitales.component.css'
})
export class HospitalesComponent implements OnInit{

  public hospitales : Hospital[] = [];
  //aqui almaceno los hospitales mientras muestro resultados de la busqueda
  public hospitalesTemp : Hospital[] = [];
  public loadingHospitals: boolean = false;

  constructor(public hospitalService: HospitalService,
             private modalImagenService: ModalImagenService,
             private busquedasService: BusquedasService)
  {

  }

  ngOnInit(): void {
    this.getHospitals();
  }

  getHospitals()
  {
    this.loadingHospitals = true;
    this.hospitalService.getAllHospitals().subscribe(
      (resp:any) =>{
        console.log(resp.hospitales);
        this.hospitales = resp.hospitales;
        this.hospitalesTemp = resp.hospitales;
        this.loadingHospitals = false;
      }
    )

  }


  deleteHospital(hospital: Hospital)
  {
    Swal.fire({
      title: "Deseas eliminar al Hospital?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.hospitalService.deleteHospital(hospital.id).subscribe(
          (resp:any)=>{
            Swal.fire("Eliminado!", "", "success");
            this.getHospitals();
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

  editHospital(hospital: Hospital)
  {
    let body = {
      name: hospital.name,
      usuario: hospital.usuario
    }

    this.hospitalService.editHospital(body, hospital.id).subscribe(
      (resp:any) =>{

        console.log(resp);
        Swal.fire({
          title: 'Exito!',
          text: 'Hospital actualizado!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          })
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

  createHospital()
  {
    console.log("lksdf")
  }

  async abrirSweetAlert()
  {
    
    const {value} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      confirmButtonText: 'Crear',
    })

    if( value && value?.trim().length > 0)
    {
      //NOTA: en mi app usuario es obligatorio
      //TODO implementar combo box para select usuario
      let body = {name: value, usuario: "66171ac43b63973c949ee5c6"}
      this.hospitalService.createHospital(body).subscribe(
        (resp: any) =>{
          console.log(resp);
          this.getHospitals();
          Swal.fire({
            title: 'Exito!',
            text: 'Hospital Creado!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            buttonsStyling: false,
            
            customClass: {
                confirmButton: 'btn btn-primary px-4',
                cancelButton: 'btn btn-danger ms-2 px-4',
            
            },
            })

        }
      )
    }


  }


  showModalUpdateImageHospital(hospital: any)
  {
    this.modalImagenService.abrirModal('hospitales', hospital.id, hospital.image);
  }

  searchHospitalByParameters(parametroBusqueda:any)
  {
   if(parametroBusqueda === '')
   {
    this.hospitales = this.hospitalesTemp;
    return;
   }
   this.busquedasService.searchByParameters('hospitales', parametroBusqueda).subscribe(
    (resp:any) =>{
      this.hospitales = [];
      console.log(resp);
      return this.hospitales = resp.resultados;
    }
  )
   
   

  }

}
