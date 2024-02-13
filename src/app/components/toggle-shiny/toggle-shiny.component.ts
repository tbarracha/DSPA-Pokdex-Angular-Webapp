import { Component } from '@angular/core';
import { ShinyPokemonGuard } from 'src/app/guards/shiny-pokemon.guard';

@Component({
  selector: 'app-toggle-shiny',
  templateUrl: './toggle-shiny.component.html',
  styleUrls: ['./toggle-shiny.component.scss']
})

export class ToggleShinyComponent {
  selected: boolean = false;

  constructor(
    private shinyGuard: ShinyPokemonGuard,
  ) {
    this.refreshSelection();
  }

  ngOnInit() {
    this.refreshSelection();
  }

  toggleShiny()
  {
    this.shinyGuard.toggleShinyMode();
    this.refreshSelection();
  }

  private refreshSelection() {
    this.selected = this.shinyGuard.isShinyModeActivated;
  }
}
