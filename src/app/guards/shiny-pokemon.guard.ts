import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShinyPokemonGuard implements CanActivate {

  static isShinyModeActivated: boolean = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return ShinyPokemonGuard.isShinyModeActivated;
  }

  static toggleShinyMode() {
    ShinyPokemonGuard.isShinyModeActivated = !ShinyPokemonGuard.isShinyModeActivated;
    console.log("Shiny mode toggled. New mode: " + ShinyPokemonGuard.isShinyModeActivated);
  }
}
