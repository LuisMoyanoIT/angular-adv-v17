import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval ,take, map, filter, Subscription} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor()
  {
    this.intervalSubs = this.returnIntervalo().subscribe(
      console.log
    )
    // this.returnObservable().pipe(
    //   retry(1)
    // ).subscribe( 
    //     valor => console.log("subs:", valor),
    //     (err) => console.warn("Error:", err),
    //     () => console.info("OBS terminado")
    //   )
  }

  //very important to unsubscribe to not affect the performance of the app
  ngOnDestroy(): void {
    console.log("chaolin obs destroyed");
    this.intervalSubs.unsubscribe();
  }

  returnIntervalo():Observable<number>{
    return interval(5).pipe(
      
      map(valor => valor+10 ),
      filter(valor => (valor % 2 === 0) ? true : false  ),
      take(10), //take at the end will let pass 10 true, but
      //if take(10) is at the top will only let pass 5, order is key
      //https://reactivex.io/documentation/operators.html
      
      );
  }

  returnObservable():Observable<number>{
    let i = -1;
    //referencia a un observable que se quiere almacenar se usa dollar sign
    return new Observable<number>( (observer) => {
      
      
      const intervalo = setInterval( () =>{
   
        i++;
        observer.next(i);

        if( i === 4)
        {
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2)
        {
          observer.error("fatal internal error")
        }
      }, 1000  );

    } )

  }

  



}
