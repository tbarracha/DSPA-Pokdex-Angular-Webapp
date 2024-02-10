import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Pokemon } from '../classes/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokeDataService {

  pokeApiLink: string = "https://pokeapi.co/api/v2/pokemon";

  cachedPokemon: { [id: number]: Pokemon } = {};

  constructor(
    private http: HttpClient
  ) { }

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
      const url = `${this.pokeApiLink}/${id}`;

      return this.http.get<any>(url).pipe(
        map(data => this.mapResponseToPokemon(data)),
        catchError(error => {
          console.error('Error fetching Pokémon:', error);
          throw 'Error fetching Pokémon. Please try again later.';
        })
      );
    }
  }

  // method used to cache fetched pokemon data
  private mapResponseToPokemon(data: any): Pokemon {
    const pokemon: Pokemon = {
      id: data.id,
      name: data.name,
      spriteURL: data.sprites.front_default,
      types: data.types.map((type: any) => type.type.name),
      height: data.height,
      weight: data.weight
    };
    this.cachedPokemon[data.id] = pokemon;
    return pokemon;
  }
}
