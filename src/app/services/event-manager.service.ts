import { Injectable, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  // event variables
  pokemonSelected: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  searchQuery: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }
}
