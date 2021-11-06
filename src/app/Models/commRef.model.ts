import { User } from "./user.model";


export class CommentaireREF
{
    id!:number;
    
    constructor(data: any)
    {
        this.id=data.id;
    }
}