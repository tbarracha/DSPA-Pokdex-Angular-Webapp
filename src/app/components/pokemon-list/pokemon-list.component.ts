import { Component, EventEmitter, HostListener, Output } from '@angular/core';

// pokemon
import { Pokemon } from 'src/app/classes/pokemon';

// services
import { PokeDataService } from 'src/app/services/poke-data.service';
import { EventManagerService } from 'src/app/services/event-manager.service';
import { ScrollEvent, ScrollService } from 'src/app/services/scroll.service';
import { PokemonType } from 'src/app/enums/PokemonType';
import { QueryType } from 'src/app/enums/queryType';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {

  loadCount: number = 15;
  maxPokeCount: number = 1025;

  pokeList: Pokemon[] = [];
  selectedPokemon: Pokemon | null;
  elementRef: any;
  canLoadMore: boolean = true;
  queryType: QueryType;

  constructor(
    private pokeDataService: PokeDataService,
    private eventManager: EventManagerService,
    private scrollService: ScrollService,
    ) {
    this.queryType = QueryType.None;
    this.selectedPokemon = null;
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
      const rand: number = this.getRandomInt(1, 1025);
      let p: Pokemon;
      this.pokeDataService.getPokemonById(rand).subscribe((pokemon: Pokemon) => this.confirmPokemonSelection(pokemon));

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
      //const startIndex = this.pokeList.length + 1;
      //const endIndex = startIndex + this.loadCount;

      if (this.pokeList.length > 1024) {
        return;
      }

      console.log("Query type: " + QueryType[this.queryType]);

      let startIndex!: number;
      let endIndex!: number;
  
      switch (this.queryType) {
          case QueryType.Id:
          case QueryType.Name:
          case QueryType.Range:
              startIndex = this.pokeList[this.pokeList.length - 1].id + 1;
              endIndex = startIndex + this.loadCount;
              break;

          case QueryType.None:
              startIndex = this.pokeList.length + 1;
              endIndex = startIndex + this.loadCount;
              break;

          default:
            break;
      }
  
      this.loadPokemonInRange(startIndex, endIndex);
    }

    private loadPokemonInRange(start: number, end: number) {
      if (start < 1) {
        start = 1;
      }

      if (end > this.maxPokeCount) {
        end = this.maxPokeCount;
      }

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

      // is it empty? Then show the first 9 Pokémon
      if (!query.trim()) {
        this.getFirstPokemon();
        console.log("query is EMPTY!");
        this.queryType = QueryType.None;
        return;
      }

      // is it a range?
      const rangeRegex = /^(\d+)-(\d+)$/;       // query for range with '-': 1-151
      const rangeRegexSpace = /^(\d+) (\d+)$/;  // query for range with 'whitespace': 1 151
      const rangeMatch = query.match(rangeRegex) || query.match(rangeRegexSpace);
      if (rangeMatch) {
        let start = parseInt(rangeMatch[1]);
        let end = parseInt(rangeMatch[2]);

        if (start < 1) {
          start = 1;
        }
  
        if (end > this.maxPokeCount) {
          end = this.maxPokeCount;
        }

        if (!isNaN(start) && !isNaN(end) && start <= end) {
          this.pokeDataService.getPokemonsInRange(start, end).subscribe((pokemons: Pokemon[]) => {
            this.pokeList = pokemons;
            this.queryType = QueryType.Range;
            console.log("Found Pokémon in range:", pokemons);
            this.scrollToTop();
          });
          return;
        } else {
          console.log("Invalid range format");
        }
      }

      // is it a number? (pokemon ID)
      if (!isNaN(Number(query))) {
        let pokemonId = Number(query);
        if (pokemonId < 0)
          pokemonId = 1;

        this.pokeDataService.getPokemonById(pokemonId).subscribe((pokemon: Pokemon) => {
          if (pokemon) {
            this.pokeList = [pokemon];
            this.queryType = QueryType.Id;
            console.log("found pokemon by ID!");
            this.scrollToTop();
          } else {
            console.log(`No Pokémon found with ID ${pokemonId}`);
          }
        });
        return;
      }

      // is it a type?
      const typeQuery = query.toLowerCase();
      const typeValues = Object.values(PokemonType) as string[];
      for (let i = 0; i < typeValues.length; i++) {
          const type = typeValues[i];
          if (typeQuery === type) {
              this.pokeDataService.getPokemonByType(type).subscribe((pokemons: Pokemon[]) => {
                  if (pokemons && pokemons.length > 0) {
                      this.pokeList = pokemons;
                      this.queryType = QueryType.Type;
                      console.log("Found Pokémon by type:", pokemons);
                      this.scrollToTop();
                  } else {
                      console.log(`No Pokémon found with type: ${typeQuery}`);
                  }
              });
              return;
          }
      }

      // is it a name?
      this.pokeDataService.getPokemonByName(query.toLowerCase()).subscribe((pokemon: Pokemon) => {
        if (pokemon) {
          this.pokeList = [pokemon];
          this.queryType = QueryType.Name;
          console.log("found pokemon by NAME!");
        } else {
          console.log(`No Pokémon found with name ${query}`);
        }
      });
    }

    private getRandomInt(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    private scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }  
}
