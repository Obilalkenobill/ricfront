import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './Models/userLogin.model';
import { AdminGuard, is_verifiedGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userCurr:any
  userCurrId:any;
  title = 'ric';
  constructor(private authService: AuthService, private router: Router, private adminAuth: AdminGuard, private Is_verified: is_verifiedGuard)
  {
  }
ngOnInit(): void {
  
  
}
public userId()
{
  this.userCurr=this.authService.getCurrentUser();
    this.userCurrId=this.userCurr.id;
  this.router.navigate(['/img-validate/'+this.userCurrId])
}

  public checkAuth()
  {
    return this.authService.isLoggedIn;
  }
  public isAdmin()
  {

    return this.adminAuth.canActivate();
  }
  public is_verified()
  {
    return this.Is_verified.canActivate();
  }
  public logout(): void
  {
    this.authService.logout();
  }
}
