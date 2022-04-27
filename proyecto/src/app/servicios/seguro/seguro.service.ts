import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  constructor(private http: HttpClient) {

  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
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
      catchError(this.handleError<any[]>('Fallo al guardar los datos',[]))
    )
  
  }

  
  private consumirGet(url:string):Observable<any>{
    return this.http.get(environment.urlService + url).pipe(
      catchError(e=>this.manejarError(e))
    )
  }

  private consumirDelete(url:string):Observable<any>{
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    return this.http.delete(environment.urlService + url,headersOptions).pipe(
      catchError(e=>this.manejarError(e))
    )
  }

  buscarSeguros(){
    return this.consumirGet("/seguros/GetAll");
  }

  buscarSegurosCliente(dniCl:number){
    return this.consumirGet("/seguros/jpql/clientedni/"+dniCl);
  }


  agregarSeguro(Seguro:any){
    return this.consumirPost("/seguros/Post",Seguro);
  }

  eliminarSeguro(id:number){
    return this.consumirDelete("/seguros/Delete/"+id);
  }

  contarSegurosCliente(dniCl:number){
    return this.consumirGet("/seguros/jpql/cliente/"+dniCl);
  }

}
