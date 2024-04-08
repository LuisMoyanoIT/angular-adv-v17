import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrl: './incrementador.component.css'
})
export class IncrementadorComponent {
  //@Input('valor') progreso: number = 10;
  @Input() progreso: number = 10;
  @Input() btnClass: string = 'btn btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();


  get getPorcentaje(){
    return `${this.progreso}%` 
  }

  changeCurrentValue(valor:number){
    if(this.progreso >= 100 && valor >= 0)
    {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }

    if(this.progreso <= 0 && valor <= 0)
    {
      this.progreso = 0;
      this.valorSalida.emit(0);
      return;
    }
    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(valor:any){
    if(valor >= 100)
    {
      this.progreso = 100;
    }else if (valor <= 0){
      this.progreso = 0;
    }else{
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);

  }

  

}
