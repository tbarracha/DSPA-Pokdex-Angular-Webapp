import { Component, EventEmitter, HostListener, Output } from '@angular/core';

// pokemon
import { Pokemon } from 'src/app/classes/pokemon';

// services
import { PokeDataService } from 'src/app/services/poke-data.service';
import { EventManagerService } from 'src/app/services/event-manager.service';
import { ScrollEvent, ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {

  pokeList: Pokemon[] = [];
  selectedPokemon: Pokemon | null = null;
  elementRef: any;
  canLoadMore: boolean = true;

  constructor(
    private pokeDataService: PokeDataService,
    private eventManager: EventManagerService,
    private scrollService: ScrollService,
    ) {
    eventManager.searchQuery.subscribe(this.searchQuery.bind(this));
    eventManager.toPage.subscribe(this.toPage.bind(this));
  }

    ngOnInit() {
      this.getFirstPokemon();
    }


    toPage(index: number) {
      if (index == 0) {
        this.getFirstPokemon();
      }
    }

    // Populate with at least 9 pokemon
    // ----------------------------------------------------------------------------------
    getFirstPokemon() {
      this.pokeDataService.getPokemonsInRange(1, 9).subscribe(
        (pokemons: Pokemon[]) => {
        this.pokeList = pokemons;
      });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
      const target = event.target as Document;
      const scrollEvent: ScrollEvent = {
        scrollTop: target.documentElement.scrollTop || target.body.scrollTop,
        scrollHeight: target.documentElement.scrollHeight || target.body.scrollHeight,
        clientHeight: target.documentElement.clientHeight || target.body.clientHeight
      };
    
      this.scrollService.getScrollEvent().next(scrollEvent);

      // calc distance to bottom
      const distanceToBottom = scrollEvent.scrollHeight - (scrollEvent.scrollTop + scrollEvent.clientHeight);
    
      // distance is in pixels
      if (this.canLoadMore && distanceToBottom <= 64) {
        this.canLoadMore = false;
        console.log('Reached the bottom of the page. Loading more Pokémon.');
        this.loadMorePokemon();
        setTimeout(() => {
          this.canLoadMore = true; // Re-enable loading more Pokémon after 0.1 seconds
        }, 100);
      }
    }


    loadMorePokemon() {
      const startIndex = this.pokeList.length + 1;
      const endIndex = startIndex + 15;
    
      this.loadPokemonInRange(startIndex, endIndex);
    }

    private loadPokemonInRange(start: number, end: number) {
      this.pokeDataService.getPokemonsInRange(start, end).subscribe(
        (pokemons: Pokemon[]) => {
          this.pokeList.push(...pokemons);
        }
      );
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

      
      const rangeRegex = /^(\d+)-(\d+)$/;       // query for ex: 1-151
      const rangeRegexSpace = /^(\d+) (\d+)$/;  // query for ex: 1 151
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
