import { Injectable, EventEmitter } from '@angular/core';
import { Pokemon } from 'src/app/classes/pokemon';
import { PageName } from '../classes/PageName';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventManagerService {

  // navigation
  toPage: EventEmitter<PageName> = new EventEmitter<PageName>();

  // pokemon
  pokemonClicked: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  pokemonSelected: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  // search
  searchQuery: EventEmitter<string> = new EventEmitter<string>();

  currentPage: PageName;

  constructor(
    private router : Router,
  ) {
    this.currentPage = PageName.Home;
    this.toPage.subscribe(this.routeToPage.bind(this))
  }

  routeToPage(targetPage: PageName) {
    if (this.currentPage == targetPage) {
      return;
    }
    
    console.log("Page Changed: " + targetPage);

    let url = `/${targetPage.toString().toLowerCase()}`;
    this.router.navigate([url]);

    console.log(url);

    switch(targetPage) {

      case PageName.Home:
        this.router.navigate(['/home']);
        break;

      case PageName.Credits:
        this.router.navigate(['/credits']);
        break;
        
      case PageName.Shiny:
        console.log("Tried To Go To Shiny");
        break;
        
        default:
        console.error("Something went wrong with page routing");
        break;
    }

    this.currentPage = targetPage;
  }
}
