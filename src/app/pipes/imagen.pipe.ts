import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const api_url = environment.api_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: any, tipo: 'usuarios'| 'medicos'| 'hospitales'): string {
    
    if(! image) return `${api_url}/upload/${tipo}/noimage.jpeg`;
    
    if(image.includes('https')) return image;
        if(image)
        {
            return `${api_url}/upload/${tipo}/${image}`;
        }else{
            return `${api_url}/upload/${tipo}/noimage.jpeg`;
        }
  }

}
