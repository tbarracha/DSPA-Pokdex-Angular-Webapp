import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShinyPokemonGuard } from './guards/shiny-pokemon.guard';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { CreditsComponent } from './components/credits/credits.component';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: ContentComponent },
  { path: 'credits', component: CreditsComponent },
  { path: 'display', component: PokemonListComponent },
  { path: 'display-shiny', component: PokemonListComponent, canActivate: [ShinyPokemonGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
