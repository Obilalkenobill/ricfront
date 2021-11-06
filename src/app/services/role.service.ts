import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Role } from '../Models/role.model';
import { RolePers } from '../Models/role_pers.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private server: ServerService) { }

  public addRole(role: Role):  Observable<Role[]> 
  {
    return this.server.post<Role>('create/role', role).pipe(
      map(res => res),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public addRoleUser(rolePers:RolePers):  Observable<RolePers> 
  {
    return this.server.post<RolePers>('set/role', rolePers).pipe(
      map(res => {
        return res
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getAll(): Observable<Role[]> 
  {
    return this.server.get<Role[]>('roles').pipe(
      
      map(res =>{
        return res.roles.map((m: Role) => new Role(m));
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getOneByID(id: any): Observable<Role | null> 
  {
    return this.server.get<Role>('role/'+ id).pipe(
      map(res => res.length > 0 ? new Role(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getRoleUserByID (rolePers:RolePers):  Observable<RolePers>  
    {
      return this.server.post<RolePers>('roleUserById', rolePers).pipe(
        map(res => {
          return res
        }),
        catchError(err => 
          {
             
            return [];
          })
      );
    }
    public deleteRolePers(rolePers: RolePers): Observable<RolePers[]>
    {
      return this.server.post<RolePers>('delete/role', rolePers).pipe(
        map(res => res),
        catchError(err => 
          {
             
            return [];
          })
      );
    }
    public deleteRolePersRole(rolePers: RolePers): Observable<RolePers[]>
    {
      return this.server.post<RolePers>('delete/role/role', rolePers).pipe(
        map(res => res),
        catchError(err => 
          {
             
            return [];
          })
      );
    }
}
