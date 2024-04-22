import { environment } from "../../environments/environment";

const api_url = environment.api_url;

interface _HospitalUser {
    _id: string,
    name: string,
    email: string,
    image?: string,
}

export class Hospital {

    constructor(
        public id: string,
        public name: string,
        public usuario?: _HospitalUser,
        public image?: string,
    ){}

   
}