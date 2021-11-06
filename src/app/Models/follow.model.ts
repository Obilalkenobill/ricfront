import { User } from "./user.model";
import {Role} from "./role.model"
import { Projet } from "./projet.model";

export class Follow
{
    personne_id!:User;
    projet_id!:Projet;
    constructor(data: any)
    {
        const newUser = new User({
            id: data.personne_id,
                });
        const newProjet = new Projet({
            id: data.projet_id,
            personne_id:data.personne_proj_id
                });
this.personne_id=newUser;
this.projet_id=newProjet;
    }
}