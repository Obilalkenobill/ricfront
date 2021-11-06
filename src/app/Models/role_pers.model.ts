import { User } from "./user.model";
import {Role} from "./role.model"

export class RolePers
{
    personne_id!:User;
    role_id!:Role;
    constructor(data: any)
    {
        const newUser = new User({
            id: data.personne_id,
                });
        const newRole = new Role({
            id: data.role_id,
                });
this.personne_id=newUser;
this.role_id=newRole;
    }
}