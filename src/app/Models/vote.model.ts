import { Projet } from "./projet.model";
import { User } from "./user.model";


export class Vote
{
    id!:number;
    projet_id!:Projet;
    personne_id!:User;
    bull_vote!:any;
    a_vote!:any;
    creation_date!:Date;




    constructor(data: any)
    {
        const newUser = new User({
            id: data.personne_id,
                });
         const newProjet = new Projet({
            id: data.projet_id,
            personne_id:User
                });        
        this.id=data.id;
        this.personne_id=newUser;
        this.projet_id=newProjet;
        this.bull_vote=data.bull_vote;
        this.a_vote=data.a_vote;
        this.creation_date=data.creation_date;
    }
}

