import { Component, Input } from '@angular/core';
import { ShinyPokemonGuard } from '../../guards/shiny-pokemon.guard';
import { Pokemon } from '../../classes/pokemon';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.scss']
})

export class PokemonImageComponent {
  @Input() pokemon?: Pokemon;

  constructor() { }

  private selectPokemon(selectedPokemon: Pokemon) {
    this.pokemon = selectedPokemon;
    console.log(selectedPokemon);
  }

  isShinyPokemon(): boolean {
    return ShinyPokemonGuard.isShinyModeActivated;
  }
}
