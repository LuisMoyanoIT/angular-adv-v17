import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//interceptor
export class TokenService implements HttpInterceptor{

  constructor() { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("paso por interceptor");
    const params = new HttpParams().append('desde','5');
  
    
    const headers = new HttpHeaders({
      'x-token': this.token
    })

    const requestClone = req.clone({
      headers,
      params
    })

    return next.handle(requestClone).pipe(
      catchError(this.handlerError)
    )
  
  }

  handlerError( error : HttpErrorResponse)
  {
    console.log("handled by function")
    console.warn(error);
    return throwError(() => new Error('testO'))
  }
}
