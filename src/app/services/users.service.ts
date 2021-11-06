import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { User } from '../Models/user.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private server: ServerService) 
  {}

  public getAll(): Observable<User[]> 
  {
    return this.server.get<User[]>('personne').pipe(
      
      map(res =>{
        return res.Personnes.map((m: any) => new User(m));
      },
      catchError(err => 
        {
           
          return [];
        })
    ));
  }

  public getOneByID(id: any): Observable<User | null> 
  {
    return this.server.get<User>('users/id/'+ id).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getOneByName(name: string): Observable<User | null> 
  {
    return this.server.get<User>('users/name/'+ name).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getOneByEmail(email: string): Observable<User | null> 
  {
    return this.server.get<User>('users/email/'+ email).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public addUser(user: User):  Observable<User[]> 
  {
    return this.server.post<User>('register', user).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public validateUser(data: any, id:number):  Observable<User[]> 
  {
    return this.server.post<any>('personne/imageverif/'+id, data).pipe(
      map(res => res),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public updateUser(user: User): Observable<User | null>
  {
    return this.server.put<User>('users/'+ user.id, user).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public deleteUser(id:number): Observable<User[]>
  {
    return this.server.deletebis<User>('users/delete/'+ id).pipe(
      map(res => res.map((m: any) => new User(m))),
      catchError(err => 
        {
           
          let err1!:any[];
          err1[1]=err;
          return err1;
        })
    );
  }

  public validate(id:number){
    return this.server.put('users/validate/'+ id).pipe(
      map(res => res.length > 0 ? new User(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
}
