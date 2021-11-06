import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsersCommonService } from 'src/app/services/users-common.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  usernameCtl!: FormControl;
  emailCtl!: FormControl;
  passwordCtl!: FormControl;
  confirm_passwordCtl!:FormControl;
  nn_confirmCtl!:FormControl;
  nomCtl!: FormControl;
  prenomCtl!: FormControl;
  nnCtl!: FormControl;
  user!: User;

  constructor(private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userComServ: UsersCommonService)   {
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(): void
  {
    this.nomCtl = this.formBuilder.control('', [Validators.required]);
    this.prenomCtl = this.formBuilder.control('', [Validators.required]);
    this.nnCtl = this.formBuilder.control('', [Validators.required,Validators.minLength(11),Validators.maxLength(11)],[this.NNAlreadyUsed()]);
    this.nn_confirmCtl = this.formBuilder.control('', [Validators.required,this.checkNN()]);
    
    this.usernameCtl = this.formBuilder.control('', [Validators.required], [this.usernameExist()]);
      this.emailCtl = this.formBuilder.control('', [Validators.required, Validators.email],[this.emailAlreadyUsed()] );
    this.passwordCtl = this.formBuilder.control('', [Validators.required]);
    this.confirm_passwordCtl=this.formBuilder.control('',[Validators.required, this.checkPassword()])

    this.userForm = this.formBuilder.group({
      login: this.usernameCtl,
      email: this.emailCtl,
      password: this.passwordCtl,
      confirm_password: this.confirm_passwordCtl,
      nom:this.nomCtl,
      prenom:this.prenomCtl,
      nn:this.nnCtl
    });
  }

  usernameExist(): any
  {
    var timeout: any;
    return (ctl: FormControl) =>
    {
      clearTimeout(timeout);
      const username = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() =>{
          if(ctl.pristine)
          {
            resolve(null);
          } else
          {
            this.userComServ.getOneByName(username).subscribe(user =>
              {
                resolve(user ? { usernameExist: true } : null);
              })
          }
        }, 300)
      });
    }
  }
  NNAlreadyUsed(): any
  {
    var timeout: any;
    return (ctl: FormControl) =>
    {
      clearTimeout(timeout);
      const nn = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() =>{
          if(ctl.pristine)
          {
            resolve(null);
          } else
          {
            this.userComServ.getOneByNN(nn).subscribe((user: any) =>
              {
                resolve(user ? { NNAlreadyUsed: true } : null);
              })
          }
        }, 300)
      });
    }
  }

  emailAlreadyUsed(): any
  {
    var timeout: any;
    return (ctl: FormControl) =>
    {
      clearTimeout(timeout);
      const email = ctl.value;
      return new Promise(resolve => {
        timeout = setTimeout(() =>{
          if(ctl.pristine)
          {
            resolve(null);
          } else
          {
            this.userComServ.getOneByEmail(email).subscribe((user: any) =>
              {
                resolve(user ? { emailAlreadyUsed: true } : null);
              })
          }
        }, 300)
      });
    }
  }
  checkPassword(): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const password_confirm = control.value;
      return password_confirm !== this.passwordCtl.value  ? {forbidden: {value: 'passwords are not equals'}} : null;
    };
  }
  checkNN(): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const nn_confirm = control.value;
      return nn_confirm !== this.nnCtl.value  ? {forbidden: {value: 'Les numéros national ne sont pas égaux'}} : null;
    };
  }

  onSubmit()
  {
    const formVal = this.userForm.value;

      formVal.id = 0;
      const newUser = new User(formVal);
      this.userComServ.addUser(newUser).subscribe(m => {});

    this.router.navigate(['/auth']);
  }
}
