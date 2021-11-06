import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { map, catchError,flatMap  } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersCommonService {

  constructor(private server: ServerService) 
  {}
  public getOneByName(name: string): Observable<User | null> 
  {
    return this.server.get<User>('users/name/'+ name,false).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getOneByEmail(email: string): Observable<User | null> 
  {
    return this.server.get<User>('users/email/'+ email, false).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  
  public getOneByNN(nn: number): Observable<User | null> 
  {
    return this.server.get<User>('users/nn/'+ nn, false).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public addUser(user: User):  Observable<any> 
  {
    return this.server.post<User>('register', user, false).pipe(
      map(res => res),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
}