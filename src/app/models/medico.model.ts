import { environment } from "../../environments/environment";

const api_url = environment.api_url;

interface _MedicoUser {
    id: string,
    name: string,
    email: string,
    image?: string,
    _id?: string,
}

interface _Hospital {
    _id: string,
    name: string,
}

export class Medico {

    constructor(
        public id: string,
        public name: string,
        public usuario?: _MedicoUser,
        public hospital?: _Hospital,
        public image?: string,
    ){}

   
}