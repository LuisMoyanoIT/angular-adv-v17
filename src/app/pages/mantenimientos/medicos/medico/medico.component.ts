import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from '../../../../services/medicos.service';
import { Medico } from '../../../../models/medico.model';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { delay } from 'rxjs';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent implements OnInit{
  image: any = "http://localhost:3000/api/upload/medicos/6d759c47-bd8a-4cd-b74c-f68fc54cbe92.png"
  
  public hospitales : Hospital[] = [];

  public selectedHospital: any ={
    id: '',
    name: '',
    image: ''
  };

  public selectedMedico: any = {
    name: '',
    hospital: '',
    usuario: ''
  };
  
  public medicoForm =  new FormGroup({
    name: new FormControl(),
    hospital: new FormControl(),
    usuario: new FormControl()
});

public usuarios: Usuario[] = [];

constructor(public router: Router,
  private formBuilder: FormBuilder,
  public medicosService : MedicosService,
  public hospitalService: HospitalService,
  private usuarioService : UsuarioService,
  private activatedRoute: ActivatedRoute
    ){
    this.medicoForm = this.formBuilder.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
      usuario: ['', Validators.required],
    })
  }
  ngOnInit(): void {

    
    this.getHospitals();
    this.getAllUsers();
    this.activatedRoute.params.subscribe(params => 
      {
        console.log(params['id'])
        if(params['id'] !== 'nuevo')
        {
          
          this.getMedicoById(params['id'])
        }
      })

    this.medicoForm.get('hospital')?.valueChanges.subscribe(
      (hospitalId: string) => {
        //TODO: trigger the change when edit
        console.log("recibi valor", hospitalId)
        console.log(this.hospitales)
        this.selectedHospital = this.hospitales.find( (hosp: Hospital) => hosp.id === hospitalId);
        console.log(this.selectedHospital);
        
      

      }
    )
  }

  

  getHospitals()
  {
    this.hospitalService.getAllHospitals().subscribe(
      (resp:any) =>{
        console.log("llame al os hospfghghi∂tales")
        this.hospitales = resp.hospitales;
      }
    )

  }

  createMedico()
  {
    if(this.selectedMedico.name !== ''){
      let body =  {
        name: this.medicoForm.get('name')?.value,
        hospital: this.medicoForm.get('hospital')?.value,
        usuario: this.medicoForm.get('usuario')?.value,
      }
      console.log(body);
      this.medicosService.editMedico(body, this.selectedMedico.id).pipe(
        delay(500)
      ).subscribe(
        (resp:any) =>{
          Swal.fire({
            title: 'Exito!',
            text: 'Medico actualizado!',
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
    }else{
    let body =  {
      name: this.medicoForm.get('name')?.value,
      hospital: this.medicoForm.get('hospital')?.value,
      usuario: this.medicoForm.get('usuario')?.value,
    }

    this.medicosService.createMedico(body).subscribe(
      (resp:any) => {
        console.log(resp);
        Swal.fire({
          title: 'Exito!',
          text: 'Medico creado!',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          buttonsStyling: false,
          
          customClass: {
              confirmButton: 'btn btn-primary px-4',
              cancelButton: 'btn btn-danger ms-2 px-4',
          
          },
          })
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico.id}`)


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



  getAllUsers()
  {
    this.usuarioService.getAllUsers(0).subscribe(
      (resp:any) => {

        this.usuarios = resp.usuarios;

      }
    )
  }
  
  getMedicoById(id:string)
  {
    
    this.medicosService.getMedicoById(id).subscribe(
      (resp:any) => {

        this.selectedMedico = resp.medico;

        let name = this.selectedMedico.name;
        let hospital = this.selectedMedico.hospital._id
        let usuario = this.selectedMedico.usuario._id

        this.selectedHospital ={
          id: this.selectedMedico.hospital._id,
          name: this.selectedMedico.hospital.name,
          image: this.selectedMedico.hospital.image
        };

        this.medicoForm = this.formBuilder.group({
          name: [ name, Validators.required],
          hospital: [hospital, Validators.required],
          usuario: [usuario, Validators.required],
        })

      

      }
    )
  }

}
