import { CommentaireREF } from "./commRef.model";
import { Projet } from "./projet.model";
import { User } from "./user.model";


export class Commentaire
{
    id!:number;
    commentaire!:string;
    creation_date!:Date;
    personne_id_id!:number;
    projet_id_id!:number;
    login!:string;
    commentaire_referent_id_id!:number;
    
    constructor(data: any)
    {
        this.id=data.id;
        this.commentaire=data.commentaire;
        this.creation_date=data.creation_date;
        this.personne_id_id=data.personne_id_id;
        this.projet_id_id=data.projet_id_id;
        this.login=data.login;
        this.commentaire_referent_id_id=data.commentaire_referent_id_id;
    }
}