import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Commentaire } from '../Models/commentaire.model';
import { Follow } from '../Models/follow.model';
import { Projet } from '../Models/projet.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  constructor(private server: ServerService) { }

  public addProjet(projet: Projet):  Observable<Projet[]> 
  {
    return this.server.post<Projet>('projet/create', projet).pipe(
      map(res => res),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public addFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/create/follow', follow).pipe(
      map(res => {;return res}),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public addCommentaire(comment: Commentaire):  Observable<Commentaire[]> 
  {
    return this.server.post<Commentaire>('projet/create/comment', comment).pipe(
      map(res => {;return res}),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public unFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/delete/follow', follow).pipe(
      map(res => {return res}),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public isFollow(follow: Follow):  Observable<Follow[]> 
  {
    return this.server.post<Follow>('projet/get/follow', follow).pipe(
      map(res =>{return res}),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public getOneByID(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/'+ id).pipe(
      map(res => res.length > 0 ? new Projet(res[0]) : null),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getCommentByProjetID(id: any): Observable<Commentaire[]| null> 
  {
    return this.server.get<Commentaire>('projet/comment/byProjetID/'+ id).pipe(
      map(res =>{
        return res.commentaires;
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public getProjetByUserId(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/byUser/'+ id).pipe(
      map(res =>{
        return res;
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }

  public getProjetByFollowerID(id: any): Observable<Projet | null> 
  {
    return this.server.get<Projet>('projet/byFollower/'+ id).pipe(
      map(res =>{
        return res;
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public getAll(): Observable<Projet[]> 
  {
    return this.server.get<Projet[]>('projet/readAll').pipe(
      
      map(res =>{
        return res.projets.map((m: Projet) => new Projet(m));
      }),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public deleteProjet(id:any): Observable<Projet[]>
  {
    return this.server.deletebis<Projet>('projet/delete/'+ id).pipe(
      map(res => res.map((m: any) => new Projet(m))),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
 public updateComment(comment:Commentaire): Observable<Commentaire[]> 
 {
   return this.server.put<Commentaire>('projet/patch/comment', comment).pipe(
     map(res =>{return res}),
     catchError(err => 
       {
          
         return [];
       })
   );
 }
}
