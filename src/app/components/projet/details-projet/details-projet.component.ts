import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { Commentaire } from 'src/app/Models/commentaire.model';
import { Follow } from 'src/app/Models/follow.model';
import { Projet } from 'src/app/Models/projet.model';
import { Vote } from 'src/app/Models/vote.model';
import { AdminGuard } from 'src/app/services/auth-guard.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProjetService } from 'src/app/services/projet.service';
import { VoteService } from 'src/app/services/vote.service';
import { MatDialog } from '@angular/material/dialog';
import { MatCommentEditComponent } from '../comment-edit/comment-edit.component';

@Component({
  selector: 'app-details-projet',
  templateUrl: './details-projet.component.html',
  styleUrls: ['./details-projet.component.scss']
})
export class DetailsProjetComponent implements OnInit {
  projetID!:number;
  projet!:Projet;
  bull_vote!:any;
  Vote!: Vote;
  VoteBase!:any;
  a_vote:boolean=true;
is_verified!:number;
is_current_user!:boolean;
is_admin!:boolean;
userID_Curr!:any;
user_follow!:any;
commentsForm!:FormGroup;
// commentsForm2!:FormGroup;
commentCtl!:FormControl;
// commentCtl2!:FormControl;
comments:Commentaire[]=[];
commentsWOREF:Commentaire[]=[];
comment!:any;
commentOFCom!:any;
  constructor(
    private projetService : ProjetService, 
    private route: ActivatedRoute, 
    private auth : AuthService,
    private voteServ: VoteService, 
    private adminAuth: AdminGuard,
     private router: Router,
     private formBuilder: FormBuilder,
     public dialog: MatDialog
     ) { 
    
    }

  ngOnInit(): void {
  this.is_verified = this.auth.getCurrentUser().is_verified ;
  this.reload();
  this.userID_Curr=this.auth.getCurrentUser().id;
  this.initForm();
  }

  initForm(): void
  {

    this.commentCtl = this.formBuilder.control('', [Validators.required],);

    this.commentsForm = this.formBuilder.group({
      commentaire: this.commentCtl
    });
  }
  onSubmit()
  {

    let formVal = this.commentsForm.value;
    formVal.personne_id_id=this.auth.getCurrentUser().id;
    formVal.projet_id_id=this.projet.id;
  
      const newCommentaire = new Commentaire(formVal);
    
      this.projetService.addCommentaire(newCommentaire).subscribe(m => {
        this.reload();
        this.comment='';
      });
  }

  onSubmit2(idReferent:any){
    let formVal = this.commentsForm.value;
    formVal.personne_id_id=this.auth.getCurrentUser().id;
    formVal.projet_id_id=this.projet.id;
    formVal.commentaire_referent_id_id=idReferent;
 
      const newCommentaire = new Commentaire(formVal);
     
      this.projetService.addCommentaire(newCommentaire).subscribe(m => {
        this.reload();
        this.commentOFCom='';
      });
    }

is_current_User(){
  return this.auth.getCurrentUser().id==this.projet?.personne_id_id;
}
is_current_UserCom(ComUserId:any){
  return this.auth.getCurrentUser().id==ComUserId;
}

is_Admin(){
  return this.adminAuth.canActivate();
}
follow(projet_id:any,userID_Curr:any){
  const newFollow = new Follow({
    personne_id: userID_Curr,
    projet_id: projet_id,
    personne_proj_id:this.projet?.personne_id_id
  });
  const follow:Follow=(newFollow);

this.projetService.addFollow(newFollow).subscribe(m=>{
  this.reload();
  //window.location.reload();
});

}

unfollow(projet_id:any,userID_Curr:any){
  const newFollow = new Follow({
    personne_id: userID_Curr,
    projet_id: projet_id,
    personne_proj_id:this.projet?.personne_id_id
  });
  const follow:Follow=(newFollow);

this.projetService.unFollow(newFollow).subscribe(m=>{
  this.reload();
 // window.location.reload();
});

}
reload(){
  if( this.route.snapshot.params["id"]){
    this.projetID=this.route.snapshot.params["id"];
    this.projetService.getOneByID(this.projetID).subscribe((m:any)=>{
    
      this.projet=m;
   
    });
    const newVote = new Vote({
      personne_id: this.auth.getCurrentUser().id,
      projet_id: this.projetID,
    });
    const vote:Vote=(newVote);
    this.voteServ.getVoteUserByID(newVote).subscribe(m=>{
      if(m){
 
      this.VoteBase=m;
      this.a_vote=true;
    }
    else{
      this.a_vote=false;
     
    }
    });
  

    const newFollow = new Follow({
      personne_id: this.auth.getCurrentUser().id,
      projet_id: this.route.snapshot.params["id"],
    });
    const follow:Follow=(newFollow);
    this.projetService.isFollow(follow).subscribe(m=>{
      
      if(m){
        this.user_follow=true;
  
      }
      else{
        this.user_follow=false;
      }
    })
    const projet_id=this.route.snapshot.params["id"];
  this.projetService.getCommentByProjetID(projet_id).subscribe((m:any)=>{
  
 this.comments=m;
 this.commentsWOREF=[];
 this.comments.forEach(element => {
   if(element.commentaire_referent_id_id === undefined){
    this.commentsWOREF.push(element);
   }
 });
    
  })
  }
}

editComment(comment:Commentaire)
{
  
const dlg = this.dialog.open(MatCommentEditComponent, {data:comment});
dlg.beforeClosed().subscribe(res=>{
  if(res){
    const newCommment=new Commentaire(res);
    this.projetService.updateComment(newCommment).subscribe(
      (m:any)=>{
        this.reload();
      }
    )
  }
})
}

vote (vote:any){
    const newVote = new Vote({
      personne_id: this.auth.getCurrentUser().id,
      projet_id: this.projetID,
      a_vote:1,
      bull_vote:vote
    });
    const voteCurr:Vote=(newVote);
    let bull_vote;
    if(voteCurr.bull_vote==null){
      bull_vote="Null"
    }else if (voteCurr.bull_vote==1){
      bull_vote="Pour";
    }
    else if(voteCurr.bull_vote==0){
      bull_vote="Contre"
    }
    if(!this.a_vote && (confirm("Êtes vous sûre de vouloir vôter "+bull_vote+" au projet "+this.projet.titre+". ")) )
      {
      this.voteServ.addVote(voteCurr).subscribe(m=>{
      this.a_vote=true;
      this.reload();
     // window.location.reload(); 
    })
      
    }
  }

  deleteProj(id:any){
    if (confirm("Êtes vous sûre de vouloir supprimer le projet "+this.projet.titre +" ? ")){
    this.projetService.deleteProjet(id).subscribe(m=>{
      this.router.navigate(['/projets-view']).then(() => {
        this.reload();
        //window.location.reload();
      });
    });
  }
  }
}
