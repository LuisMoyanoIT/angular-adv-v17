import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrl: './promesas.component.css'
})
export class PromesasComponent implements OnInit{

  constructor(){}

  ngOnInit(): void {
    this.getUsuarios().then( (resp:any) =>{
      console.log(resp)
    })
  }

  getUsuarios(){

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve(body.data))

    } );
    
  }


  promiseExample()
{
  const promesa = new Promise( (resolve, reject)=>{

    if (false) {
      resolve("hola mundo");
    }else{
      reject('Algo salio mal')
    }
  } );


  promesa.then( (mensaje)=>{
    console.log(mensaje)
    console.log("hey termine");
  } ).catch( error => console.log("ERror en la promesa,", error) )

  console.log("Fin del init")
  
}

}


