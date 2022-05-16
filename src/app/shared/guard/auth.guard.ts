import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '@app/shared/services';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    returnUrl: string = ''
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
        const loggedInUser = this.authService.isAuthenticated();
        const user = this.authService.user;
        this.returnUrl = state.url
        if (!loggedInUser) {
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false;
        }else{
            return true;
        }
    }

}
