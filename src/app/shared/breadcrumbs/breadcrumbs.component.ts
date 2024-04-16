import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: ``
})
export class BreadcrumbsComponent implements OnDestroy{

  title: string = '';
  public titleSubs$ : Subscription;

  constructor( private router: Router ){
    this.titleSubs$ = this.getUrlParameters().subscribe( data =>{
      console.log(data);
      this.title = data['titulo'];
      console.log(this.title);
      document.title = this.title;
    })

  }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getUrlParameters()
  {
    return this.router.events.pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) =>  event.snapshot.data)
    )
  }

}
