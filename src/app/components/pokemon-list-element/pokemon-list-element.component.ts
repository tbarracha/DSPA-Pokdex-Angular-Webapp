// pokemon-displayer.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';

@Component({
  selector: 'app-pokemon-list-element',
  templateUrl: './pokemon-list-element.component.html',
  styleUrls: ['./pokemon-list-element.component.scss']
})

export class PokemonListElementComponent {
  @Input() pokemon?: Pokemon;
  @Output() pokemonClicked: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  displayPokemonDetails() {
    this.pokemonClicked.emit(this.pokemon);
  }
}
