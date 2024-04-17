import { environment } from "../../environments/environment";

const api_url = environment.api_url;

export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public image?: string,
        public google?: boolean,
        public uid?: string,
        public role?: string,        
    ){}

    get imageUrl()
    {
        if(this.image?.includes('https')) return this.image;
        if(this.image)
        {
            return `${api_url}/upload/usuarios/${this.image}`;
        }else{
            return `${api_url}/upload/usuarios/noimage.jpeg`;
        }
    }
}

