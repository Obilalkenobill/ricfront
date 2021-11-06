import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../Models/userLogin.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, flatMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private BASE_URL: string = 'http://localhost:8000/api/';
  /**
     * Instance privée de ce helper qui nous aidera à vérifier si
     * un token est expiré ou non.
     */

  constructor(private http: HttpClient, private jwt: JwtHelperService)
  {
  }

  public get<T>(url: string, secure: boolean = true): Observable<any>
  {
    if(secure){
    return this.call(() =>this.http.get(this.BASE_URL + url));
   }
   else
   {
     return this.http.get(this.BASE_URL + url);
   }
}

  public post<T>(url: string, body: T, secure:boolean=true): Observable<any>
  {
    if(secure){
    return this.call(() =>this.http.post(this.BASE_URL + url, body));
   }
   else{
    return this.http.post(this.BASE_URL + url, body);
   }
}

  public put<T>(url: string,body?: T): Observable<any>
  {
    return this.call(() =>this.http.put(this.BASE_URL + url, body));
  }

  public delete<T>(url: string, body: T): Observable<any>
  {
    return this.call(() => this.http.delete(this.BASE_URL + url, body));
  }
  public deletebis<T>(url: string): Observable<any>
  {
    return this.call(() => this.http.delete(this.BASE_URL + url));
  }


  public login(user: User): Observable<any>
  {
    const headers = new HttpHeaders()
   .set('content-type', 'application/json')

    return this.http.post<any>(this.BASE_URL + 'login_check', user, {'headers':headers}).pipe(
      map((data: any) => {
        if(data.token)
        {
          const token = data.token;
          user.roles=this.jwt.decodeToken(data.token).roles;
          user.id=this.jwt.decodeToken(data.token).id;
          user.is_verified=this.jwt.decodeToken(data.token).is_verified;
          sessionStorage.setItem('user', JSON.stringify(user));
          let user1 = sessionStorage.getItem('user');
          sessionStorage.setItem('id_token', token);
          return true;
        }
        return false;
      }), catchError((res: any) =>
        {
          return of(false);
        })
    );
  }
  /**
     * Le but de la méthode call() est de préalablement vérifier si le token existe
     * et s'il n'est pas expiré. S'il est expiré, elle en redemande un nouveau. Ensuite
     * elle exécute la fonction lambda (func) qu'elle a reçue en paramètre et qui, elle,
     * fait réellement appel au serveur via AuthHttp. De cette manière, on peut appeler
     * les méthodes ci-dessus sans se préoccuper de vérifier si le token est encore
     * valide. Cette vérification est faite de manière automatique et transparente pour
     * le code qui utilise ce service.
     */
   private call<T>(func: any): Observable<any> {
    // Récupère le token depuis le sessionStorage
    const token = sessionStorage.getItem('id_token');
    // Si le token n'existe pas ou s'il est expiré ...
    if (!token || this.jwt.isTokenExpired(token)) {
      const user = JSON.parse(sessionStorage.getItem('user') || '');
      return this.http.post<any>(this.BASE_URL + 'login_check', user).pipe(
        flatMap((data: any) => {
          if(data.token)
          {
            const token = data.token;
            // sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('id_token', token);
          }
          return func();
        }), catchError((res: any) =>
          {
            return func();
          })
      );
    } else {
        // si le token est valide et n'est pas expiré, on peut directement
        // faire appel à l'API protégée
        return func();
    }
}
public logout(): void
{
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('id_token');
}
}
