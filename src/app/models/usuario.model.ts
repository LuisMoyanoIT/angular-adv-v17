export class Usuario {

    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public google?: boolean,
        public uid?: string,
        public role?: string,        
    ){

    }
}