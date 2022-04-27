import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegurocompaniaService {
  constructor(private http: HttpClient ) { }



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
      catchError(this.handleError<any>('Fallo al pedir los datos',[]))
    )
  }

  private consumirDelete(url:string):Observable<any>{
    let headersOptions = {
      headers: new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    return this.http.delete(environment.urlService + url,headersOptions).pipe(
      catchError(this.handleError<any>('Fallo al eliminar el cliente',""))
    )
  }

  buscarCompaniasSeguros(){
    return this.consumirGet("/companiasseguros/GetAll");
  }


  agregarrCompaniaSeguro(companiaSeguro:any){
    return this.consumirPost("/companiasseguros/Post",companiaSeguro);
  }

  eliminarCompaniaSeguro(id:number){
    return this.consumirDelete("/siniestros/Delete/"+id);
  }

}
