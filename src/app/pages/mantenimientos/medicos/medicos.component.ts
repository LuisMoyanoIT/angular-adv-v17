import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.css'
})
export class MedicosComponent implements OnInit{

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public loadingMedicos: boolean = false;
  constructor(public medicosService : MedicosService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService)
  {

  }

  ngOnInit(): void {

    this.getAllMedicos();
  }

  getAllMedicos()
  {
    this.loadingMedicos = true;
    this.medicosService.getAllMedicos().subscribe(
      (resp:any) =>{
        console.log(resp);
        this.medicos = resp.medicos;
        this.medicosTemp = resp.medicos;
        this.loadingMedicos = false;
      }
    )
  }


  deleteMedico(medico: Medico)
  {
    Swal.fire({
      title: "Deseas eliminar al Medico?",
      showDenyButton: true,
      confirmButtonText: "Borrar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.medicosService.deleteMedico(medico.id).subscribe(
          (resp:any)=>{
            Swal.fire("Eliminado!", "", "success");
            this.getAllMedicos();
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

  editMedico(medico: Medico)
  {
    console.log(medico);
  }

  showModalUpdateImageMedico(medico: any)
  {
    this.modalImagenService.abrirModal('medicos', medico.id, medico.image);
  }

  searchMedicoByParameters(parameter: any)
  {
    if(parameter === '')
   {
    this.medicos = this.medicosTemp;
    return;
   }

   this.busquedasService.searchByParameters('medicos', parameter).subscribe(
    (resp:any) =>{
      this.medicos = [];
      console.log(resp);
      return this.medicos = resp.resultados;
    }
  )
  }

  async abrirSweetAlert()
  {
    
  }

}
