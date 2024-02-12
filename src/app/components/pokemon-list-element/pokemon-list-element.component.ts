import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';
import { ShinyPokemonGuard } from 'src/app/guards/shiny-pokemon.guard';

@Component({
  selector: 'app-pokemon-list-element',
  templateUrl: './pokemon-list-element.component.html',
  styleUrls: ['./pokemon-list-element.component.scss']
})
export class PokemonListElementComponent {

  @Input() pokemon?: Pokemon;
  @Output() pokemonClicked: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor() {}

  displayPokemonDetails() {
    this.pokemonClicked.emit(this.pokemon);
  }

  isShinyPokemon(): boolean {
    return ShinyPokemonGuard.isShinyModeActivated;
  }
}
