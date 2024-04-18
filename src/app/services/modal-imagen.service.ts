import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const api_url = environment.api_url;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: string = '';
  public id: any = '';
  public image: string  = 'noimage.jpeg';

  constructor() { }

  get ocultarModal()
  {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    id: string | undefined,
    image: any
  )
  {
    
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;

    if(image.includes('https'))
    {
      this.image = image;
    }else{
      this.image = `${api_url}/upload/${tipo}/${image}`;
    }
    
  }

  cerrarModal()
  {
    this._ocultarModal = true;
  }




  
}
