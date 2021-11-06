import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Models/role.model';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { UsersService } from 'src/app/services/users.service';
import { RolePers } from 'src/app/Models/role_pers.model';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


user!: User;
  listRoles!:Role[];
  rolePers!: RolePers;
  selected!: number;
  confirmAdd!:boolean;
  role_current:Role[]=[];
  constructor(private userService: UsersService, 
    private usersCommonService: UsersCommonService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private roleService: RoleService
  )   {
  }

  ngOnInit(): void {
    if(this.route.snapshot.params["id"])
    {
      this.userService.getOneByID(this.route.snapshot.params["id"]).subscribe(m => 
        {
          if(m)
          {   
            this.user = m;
   
          }
        });
    };
    this.roleService.getAll().subscribe((m:Role[])=>
      {
        if(m)
      {
        this.listRoles=m;
      }
    });
   
  }
  
  AddRoleSUser(event: any, user_id: any ){
    const role_id= event.target.value;
    
   

    const newRole = new RolePers({
      personne_id: user_id,
      role_id: role_id,
    });

    const rolePers:RolePers=(newRole);
   
    if(role_id!=""){
      this.roleService.getRoleUserByID(rolePers).subscribe((data:any)=>{
        if(data.length>0){
        alert("This role is already attributed");
        }
        else
        {
          this.roleService.getOneByID(role_id).subscribe(data=>{
            if (confirm("Are sur to add role : "+data?.label+", to User :"+this.user.login)) {
              this.roleService.addRoleUser(rolePers).subscribe(m=>{
                this.ngOnInit();  
                //window.location.reload();
              });
            } 
          });
        }
      })
    }
  }

  deleteRolePers(event: any, user_id: any ){
    const role_id= event.target.value;
  

    const newRole = new RolePers({
      personne_id: user_id,
      role_id: role_id,
    });
    const rolePers:RolePers=(newRole);

    if(role_id!=""){
      this.roleService.getOneByID(role_id).subscribe(data=>{
        if (confirm("Are sur to delete role : "+data?.label+", to User :"+this.user.login)) {
           this.roleService.deleteRolePers(rolePers).subscribe(m=>{
          this.ngOnInit();   
            //window.location.reload();
          });
           
        } 
      });
  
    }
  }
}

  


