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

  constructor(
    private shinyGuard: ShinyPokemonGuard,
  ) { }

  isShinyPokemon(): boolean {
    return this.shinyGuard.isShinyModeActivated;
  }

  playPokemonCry() {
    if (this.pokemon == null) {
      console.log("pokemon is null!");
      return;
    }

    const audio = new Audio(this.pokemon?.cry);
    audio.play();
  }
}
