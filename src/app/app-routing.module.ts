import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShinyPokemonGuard } from './guards/shiny-pokemon.guard';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: 'pokemon-list', component: PokemonListComponent, canActivate: [ShinyPokemonGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
