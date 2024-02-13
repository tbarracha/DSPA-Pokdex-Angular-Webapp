import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShinyPokemonGuard implements CanActivate {

  isShinyModeActivated: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isShinyModeActivated;
  }

  toggleShinyMode() {
    this.isShinyModeActivated = !this.isShinyModeActivated;
    console.log("Shiny mode toggled. New mode: " + this.isShinyModeActivated);
  }
}
