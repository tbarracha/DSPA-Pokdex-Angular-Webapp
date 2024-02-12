import { Component } from '@angular/core';
import { ShinyPokemonGuard } from 'src/app/guards/shiny-pokemon.guard';

@Component({
  selector: 'app-toggle-shiny',
  templateUrl: './toggle-shiny.component.html',
  styleUrls: ['./toggle-shiny.component.scss']
})
export class ToggleShinyComponent {
  
  toggleShinyMode(event: any) {
    ShinyPokemonGuard.toggleShinyMode();
  }
}
