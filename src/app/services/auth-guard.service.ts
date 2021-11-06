import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }
        
        // Navigate to the login page with extras
        this.authService.redirectUrl = url;
        this.router.navigate(['/auth']);
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate
{
    isAdmin:boolean=false;
    constructor(private authService: AuthService) { 
        this.isAdmin=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.roles?.includes("ROLE_ADMIN"))
        {
            return true;
        }
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate
{
    isSuperAdmin:boolean=false;
    constructor(private authService: AuthService) { 
        this.isSuperAdmin=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.roles?.includes("ROLE_SUPER_ADMIN"))
        {
            return true;
        }
        return false;
    }
}


@Injectable({
    providedIn: 'root',
})
export class is_verifiedGuard implements CanActivate
{
    is_verified:boolean=false;
    constructor(private authService: AuthService) { 
        this.is_verified=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.is_verified==1)
        {
            return true;
        }
        return false;
    }
}