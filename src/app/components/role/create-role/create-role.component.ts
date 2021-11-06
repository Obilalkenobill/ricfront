import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Models/role.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

  roleForm!: FormGroup;
  labelCtl!: FormControl;
  role!: Role;

  constructor(private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,)   {
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(): void
  {
    this.labelCtl = this.formBuilder.control('', [Validators.required]);
    this.roleForm = this.formBuilder.group({
      label:this.labelCtl
    });
  }

  // usernameExist(): any
  // {
  //   var timeout: any;
  //   return (ctl: FormControl) =>
  //   {
  //     clearTimeout(timeout);
  //     const username = ctl.value;
  //     return new Promise(resolve => {
  //       timeout = setTimeout(() =>{
  //         if(ctl.pristine)
  //         {
  //           resolve(null);
  //         } else
  //         {
  //           this.userComServ.getOneByName(username).subscribe(user =>
  //             {
  //               resolve(user ? { usernameExist: true } : null);
  //             })
  //         }
  //       }, 300)
  //     });
  //   }
  // }

  onSubmit()
  {
    const formVal = this.roleForm.value;

      const newRole = new Role(formVal);
      this.roleService.addRole(newRole).subscribe(m=> {});

    this.router.navigate(['/view-roles']);
  }
}
