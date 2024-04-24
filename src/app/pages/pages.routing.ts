import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { PagesComponent } from "./pages.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { ProgressComponent } from "./progress/progress.component"
import { Grafica1Component } from "./grafica1/grafica1.component"
import { AccountSettingsComponent } from "./account-settings/account-settings.component"
import { PromesasComponent } from "./promesas/promesas.component"
import { RxjsComponent } from "./rxjs/rxjs.component"
import { authGuard } from "../guards/auth.guard"
import { PerfilComponent } from "./perfil/perfil.component"
import { UsuariosComponent } from "./mantenimientos/usuarios/usuarios.component"
import { MedicosComponent } from "./mantenimientos/medicos/medicos.component"
import { HospitalesComponent } from "./mantenimientos/hospitales/hospitales.component"
import { MedicoComponent } from "./mantenimientos/medicos/medico/medico.component"
import { BusquedaComponent } from "./busqueda/busqueda.component"
import { adminGuard } from "../guards/admin.guard"

const routes: Routes = [
    { path: 'dashboard', 
    component: PagesComponent,
    canActivate: [authGuard],
    children: [
        //rutas protegidas
      {path: '', component: DashboardComponent, data: {titulo: 'Dashboard'}},
      {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
      {path: 'grafica1', component: Grafica1Component, data: {titulo: 'Graficas'}},
      {path: 'settings', component: AccountSettingsComponent, data: {titulo: 'Settings'}},
      {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
      {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Arrakis JOTA Z'}},
      {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'}},
      //mantenimientos
      {path: 'usuarios', canActivate: [adminGuard],component: UsuariosComponent, data: {titulo: 'Usuarios'}},
      {path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos'}},
      {path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'}},
      {path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'}},

      {path: 'busqueda/:parametro', component: BusquedaComponent, data: {titulo: 'Busquedas'}},

    ]
  },
    
]


@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }

