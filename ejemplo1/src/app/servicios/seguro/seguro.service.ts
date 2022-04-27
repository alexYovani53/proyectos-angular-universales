import {  environment } from "src/environments/environment";

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  constructor(private http: HttpClient) {

  }

  
  manejarError(e:any){
    return throwError("Hay un error")
  }

  private consumirPost(url:string,parametros:any):Observable<any>{
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    return this.http.post(environment.urlService + url,parametros,headersOptions).pipe(
      catchError(e=>this.manejarError(e))
    )
  
  }

  
  private consumirGet(url:string):Observable<any>{
    return this.http.get(environment.urlService + url).pipe(
      catchError(e=>this.manejarError(e))
    )
  }

  buscarSeguros(){
    return this.consumirGet("/seguros/GetAll");
  }

  agregarSeguro(Seguro:any){
    return this.consumirPost("/seguros/Post",Seguro);
  }

}
