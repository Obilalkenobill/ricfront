import { User } from "./user.model";


export class Projet
{
    id!:number;
    titre!:string;
    descriptif!:string;
    nbr_vote_pour!:number;
    nbr_vote_contre!:number;
    nbr_vote_null!:number;
    date_adm!:Date;
    date_rej!:Date;
    creation_date!:Date;
    personne_id_id!:number;
    
    constructor(data: any)
    {
        this.id=data.id;
        this.titre=data.titre;
        this.descriptif=data.descriptif;
        this.nbr_vote_pour=data.nbr_vote_pour;
        this.nbr_vote_contre=data.nbr_vote_contre;
        this.nbr_vote_null=data.nbr_vote_null;
        this.date_adm=data.date_adm;
        this.date_rej=data.date_rej;
        this.creation_date=data.creation_date;
        this.personne_id_id=data.personne_id_id;
    }
}