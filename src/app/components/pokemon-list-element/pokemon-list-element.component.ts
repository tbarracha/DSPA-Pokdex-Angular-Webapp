import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';
import { ShinyPokemonGuard } from 'src/app/guards/shiny-pokemon.guard';
import { EventManagerService } from 'src/app/services/event-manager.service';

@Component({
  selector: 'app-pokemon-list-element',
  templateUrl: './pokemon-list-element.component.html',
  styleUrls: ['./pokemon-list-element.component.scss']
})
export class PokemonListElementComponent {

  @Input() pokemon?: Pokemon;

  constructor(
    private eventManager: EventManagerService,
    private shinyGuard: ShinyPokemonGuard,
  ) {}

  displayPokemonDetails() {
    this.eventManager.pokemonClicked.emit(this.pokemon);
  }

  isShinyPokemon(): boolean {
    return this.shinyGuard.isShinyModeActivated;
  }
}
