import { Component, EventEmitter, Output } from '@angular/core';

// pokemon
import { Pokemon } from 'src/app/classes/pokemon';

// services
import { PokeDataService } from 'src/app/services/poke-data.service';
import { EventManagerService } from 'src/app/services/event-manager.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {

  pokeList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;

  constructor(
    private pokeDataService: PokeDataService,
    private eventManager: EventManagerService
    ) {
    eventManager.searchQuery.subscribe(this.searchQuery.bind(this))
  }

    ngOnInit() {
      this.getFirstPokemon();
    }


    // Populate with at least 9 pokemon
    // ----------------------------------------------------------------------------------
    getFirstPokemon() {
      this.pokeDataService.getPokemonsInRange(1, 9).subscribe(
        (pokemons: Pokemon[]) => {
        this.pokeList = pokemons;
      });

      for (let i = 0; i < this.pokeList.length; i++) {
        const element = this.pokeList[i];
        console.log(element);
      }
    }


    // Pokemon selection
    // ----------------------------------------------------------------------------------
    selectPokemon(pokemon: Pokemon) {
      if (pokemon == null) {
        return;
      }

      if (this.selectedPokemon != null && this.selectedPokemon.id == pokemon.id) {
        return;
      }

      this.confirmPokemonSelection(pokemon);
    }

    confirmPokemonSelection(pokemon: Pokemon) {
      console.log("Selected: " + pokemon.name);
      this.selectedPokemon = pokemon;
      this.eventManager.pokemonSelected.emit(pokemon);
    }


    // Search Query
    // ----------------------------------------------------------------------------------
    private searchQuery(query: string) {
      console.log("Pokemon list recieved a query - " + query);
    }
}
