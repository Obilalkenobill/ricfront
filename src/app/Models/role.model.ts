export class Role
{
    id!:number;
    label!:string;
    
    constructor(data: any)
    {
        this.id=data.id;
this.label=data.label;
    }
}