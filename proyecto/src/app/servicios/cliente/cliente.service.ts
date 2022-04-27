import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }


  private consumirDelete(url:string):Observable<any>{
    return this.http.delete<any>(environment.urlService+ url)
    .pipe(
      catchError(e=>this.manejarError(e))
    );
  }

  private consumirPost(url:string, parametro:any):Observable<any>{
    let headersOptions = {
      headers: new HttpHeaders(
        {'Content-type':'application/json'}
      )
    }

    return this.http.post<any>(environment.urlService + url,parametro,headersOptions)
    .pipe(
      catchError(e => this.manejarError(e))
    );
  }

  private consummirGet(url:string):Observable<any>{
    return this.http.get<any>(environment.urlService +  url).pipe(
      catchError(e=> this.manejarError(e))
    )
  }

  private manejarError(e:any){
    return throwError("Hay un error")
  }

  buscarClientes(){
    return this.consummirGet("/cliente/GetAll")
  }

  buscarClientesPaginador(pagina:number,filas:number){
    return this.consummirGet(`/cliente/paginador/${pagina}/${filas}`)
  }

  guardarUsuario(usuario:any){
    return this.consumirPost("/cliente/Post",usuario);
  }

  eliminarCliente(id:number){
    return this.consumirDelete("/cliente/Delete/"+id);
  }
}
