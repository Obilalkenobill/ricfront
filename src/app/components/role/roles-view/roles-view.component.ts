import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/Models/role.model';
import { RolePers } from 'src/app/Models/role_pers.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.scss']
})
export class RolesViewComponent implements OnInit {
  public rolesList!: Role[];

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit(): void {
    this.roleService.getAll().subscribe(roles => 
      {
        this.rolesList = roles;
      });
  }
  redirectCreateRole(){
    this.router.navigate(['/create-role']);
  }

  deleteRole(role_id:any){
    const newRole = new RolePers({
      role_id: role_id,
    });
    const rolePers:RolePers=(newRole);
    this.roleService.deleteRolePersRole(rolePers).subscribe(m=>{
      this.ngOnInit();
      //window.location.reload();
    });
    
  }
}
