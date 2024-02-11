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
      //console.log("Pokemon list recieved a query: " + query);

      // If the query is empty, show the first 9 Pokémon
      if (!query.trim()) {
        this.getFirstPokemon();
        console.log("query is EMPTY!");
        return;
      }

      // If the query contains a range in the format "start-end"
      const rangeRegex = /^(\d+)-(\d+)$/;
      const rangeRegexSpace = /^(\d+) (\d+)$/;
      const rangeMatch = query.match(rangeRegex) || query.match(rangeRegexSpace);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = parseInt(rangeMatch[2]);
        if (!isNaN(start) && !isNaN(end) && start <= end) {
          this.pokeDataService.getPokemonsInRange(start, end).subscribe((pokemons: Pokemon[]) => {
            this.pokeList = pokemons;
            console.log("Found Pokémon in range:", pokemons);
          });
          return;
        } else {
          console.log("Invalid range format");
        }
      }

      // If the query is a number, fetch Pokémon by ID
      if (!isNaN(Number(query))) {
        let pokemonId = Number(query);
        if (pokemonId < 0)
          pokemonId = 1;

        this.pokeDataService.getPokemonById(pokemonId).subscribe((pokemon: Pokemon) => {
          if (pokemon) {
            this.pokeList = [pokemon];
            console.log("found pokemon by ID!");
          } else {
            console.log(`No Pokémon found with ID ${pokemonId}`);
          }
        });
        return;
      }

      // If the query is a name, fetch Pokémon by name
      this.pokeDataService.getPokemonByName(query.toLowerCase()).subscribe((pokemon: Pokemon) => {
        if (pokemon) {
          this.pokeList = [pokemon];
          console.log("found pokemon by NAME!");
        } else {
          console.log(`No Pokémon found with name ${query}`);
        }
      });
    }
}
