import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { Pokemon } from '../classes/pokemon';
import { PokemonType } from '../enums/PokemonType';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  pokeApiURL: string = "https://pokeapi.co/api/v2";
  pokemonURL: string = "https://pokeapi.co/api/v2/pokemon/";
  typeURL: string = "https://pokeapi.co/api/v2/type/";

  cachedPokemon: { [id: number]: Pokemon } = {};

  constructor(
    private http: HttpClient
  ) { }

  static isShinyPokemon(id: number): boolean {
    // Your logic to determine if a Pokemon is shiny
    
    return true;
  }

  getPokemonsInRange(start: number, end: number): Observable<Pokemon[]> {
    const observables: Observable<Pokemon>[] = [];
  
    for (let i = start; i <= end; i++) {
      observables.push(this.getPokemonById(i));
    }
  
    return forkJoin(observables); // forkJoin asyncronously awaits all of the array elements
  }

  getPokemonById(id: number): Observable<Pokemon> {
    if (this.cachedPokemon[id]) {
      return of(this.cachedPokemon[id]);
    }

    else {
      const url = `${this.pokemonURL}${id}`;

      return this.http.get<any>(url).pipe(
        map(data => this.mapResponseToPokemon(data)),
        catchError(error => {
          console.error('Error fetching Pokémon:', error);
          throw 'Error fetching Pokémon. Please try again later.';
        })
      );
    }
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${this.pokemonURL}${name}`;
  
    return this.http.get<any>(url).pipe(
      map(data => this.mapResponseToPokemon(data)),
      catchError(error => {
        console.error(`Error fetching Pokémon with name ${name}:`, error);
        throw `Error fetching Pokémon with name ${name}. Please try again later.`;
      })
    );
  }

  getPokemonByType(type: string): Observable<Pokemon[]> {
    const typeLower = type.toLowerCase()
    if (!(typeLower in PokemonType)) {
      // If the type is not a valid PokemonType enum value, return an empty array
      return of([]);
    }
  
    const url = `${this.typeURL}${typeLower}`;
  
    return this.http.get<any>(url).pipe(
      mergeMap((data: any) => {
        const observables: Observable<Pokemon>[] = [];
        data.pokemon.forEach((pokemonData: any) => {
          const pokemonUrl = `${this.pokemonURL}${pokemonData.pokemon.name}`;
          observables.push(this.http.get<any>(pokemonUrl).pipe(
            map((pokemonData: any) => this.mapResponseToPokemon(pokemonData))
          ));
        });
        return forkJoin(observables);
      }),
      catchError(error => {
        console.error(`Error fetching Pokémon of type ${typeLower}:`, error);
        throw `Error fetching Pokémon of type ${typeLower}. Please try again later.`;
      })
    );
  }

  

  // method used to cache fetched pokemon data
  private mapResponseToPokemon(data: any): Pokemon {
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      spriteURL: data.sprites.front_default,
      spriteShinyURL: data.sprites.front_shiny,
      types: data.types.map((type: any) => type.type.name),
      height: data.height,
      weight: data.weight,
      cry: data.cries.latest,
    };

    //console.log(pokemon);
    //console.log(data.cries);
    this.cachedPokemon[data.id] = pokemon;
    return pokemon;
  }
}
