import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from '../services/identity.service';
import { inject } from '@angular/core';

export const canActivateDashboard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const identityService = inject(IdentityService)
  if (identityService.isLogined()) {
    return true
  }
  return false;
  // else {
  //   return createUrlTreeFromSnapshot(route.root, ['identity/login']); 
  // }
};

export const canActivateIdentity: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const identityService = inject(IdentityService)
  if (identityService.isLogined()) {
    return createUrlTreeFromSnapshot(route.root, ['dashboard'])
  }
  else {
    return true
  }
};
export const canActivateMainPage: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const identityService = inject(IdentityService)
  if (identityService.isLogined()) {
    return createUrlTreeFromSnapshot(route.root, ['dashboard'])
  }
  else {
    return createUrlTreeFromSnapshot(route.root, ['identity/login'])
  }
};
