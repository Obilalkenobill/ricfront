import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  userForm!: FormGroup;
  usernameCtl!: FormControl;
  passwordCtl!: FormControl;
  constructor(private authserv: AuthService , private server: ServerService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

  }

  initForm(): void
  {
    this.usernameCtl = this.formBuilder.control('', [Validators.required]);
    this.passwordCtl = this.formBuilder.control('', [Validators.required]);

    this.userForm = this.formBuilder.group({
      username: this.usernameCtl,
      password: this.passwordCtl
    });
  }

  onSubmit()
  {
    const formVal = this.userForm.value;
    const newUser = new User(formVal);
    this.server.login(newUser).subscribe(m =>
      {
        this.authserv.isLoggedIn=m;
        if(m)
        {
        // this.router.navigate(['/users-view']);
         }
      });
  }
}

