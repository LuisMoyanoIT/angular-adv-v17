import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit{

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService
  ){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({parametro}) => {
        this.globalSearchByParamter(parametro);
      }
    )
  }

  globalSearchByParamter(parametro:string)
  {
    this.busquedasService.globalSearchByParameters(parametro).subscribe(
      (resp:any) => {
        console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      }
    )
  }

  abrirMedico(medico: Medico)
  {
    console.log(medico);
  }

}
