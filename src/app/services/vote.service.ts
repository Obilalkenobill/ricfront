import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Vote } from '../Models/vote.model';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private server: ServerService) { }

  public addVote(vote: Vote):  Observable<Vote[]> 
  {
    return this.server.post<Vote>('vote', vote).pipe(
      map(res => res),
      catchError(err => 
        {
           
          return [];
        })
    );
  }
  public getVoteUserByID (vote:Vote):  Observable<Vote>  
  {
    return this.server.post<Vote>('vote/voteByProjUser', vote).pipe(
      map(res => {
        return res
      }),
      catchError(err => 
        {
          return [];
        })
    );
  }
}
