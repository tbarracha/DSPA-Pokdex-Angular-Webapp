import { Component, Input } from '@angular/core';
import { ShinyPokemonGuard } from '../../guards/shiny-pokemon.guard';
import { Pokemon } from '../../classes/pokemon';
import { Utils } from 'src/app/classes/utils';
import { EventManagerService } from 'src/app/services/event-manager.service';
import { PokemonImageDisplayStyle } from 'src/app/enums/ImageDisplayType';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.scss']
})

export class PokemonImageComponent {
  @Input() pokemon?: Pokemon;
  @Input() isDisplayImg: boolean = false;

  imageNotFound: boolean = false;
  shinySpriteURL?: string;
  normalSpriteURL?: string;

  constructor(
    private shinyGuard: ShinyPokemonGuard,
    private eventManager: EventManagerService,
  ) {
    eventManager.onImageDisplayStyleChange.subscribe(this.onUseLegacyImageChanged.bind(this));
  }

  ngOnChanges() {
    this.imageNotFound = false;

    if (this.pokemon) {
      this.normalSpriteURL = this.isDisplayImg && Utils.useLegacyImg ? this.pokemon?.spriteURL : this.pokemon?.spriteSerebiURL;
      this.shinySpriteURL = this.isDisplayImg && Utils.useLegacyImg ? this.pokemon?.spriteShinyURL : this.pokemon?.spriteSerebiShinyURL;
    }
  }

  @Input() setPokemon(pokemon: Pokemon, isDisplay: boolean) {
    this.pokemon = pokemon;
    this.isDisplayImg = isDisplay;
  }

  isShinyPokemon(): boolean {
    return this.isDisplayImg && this.shinyGuard.isShinyModeActivated;
  }

  playPokemonCry() {
    if (!this.isDisplayImg) {
      console.log("Can't play cry!");
      return;
    }

    if (this.pokemon == null) {
      console.log("Pokemon is null!");
      return;
    }

    const audio = new Audio(this.pokemon?.cry);
    audio.play();
  }

  // Function to handle image loading errors
  onImageError() {
      // Set the flag to indicate that the image was not found
      this.imageNotFound = true;

      Utils.useLegacyImg = true;
      this.eventManager.onImageDisplayStyleChange.emit(PokemonImageDisplayStyle.Pixel);

      this.normalSpriteURL = this.pokemon?.spriteURL;
      this.shinySpriteURL = this.pokemon?.spriteShinyURL;
  }

  private onUseLegacyImageChanged(displayStyle: PokemonImageDisplayStyle) {
    if (!this.isDisplayImg) {
      return;
    }

    const isPixel: boolean = displayStyle == PokemonImageDisplayStyle.Pixel;
    
    this.normalSpriteURL = isPixel ? this.pokemon?.spriteURL : this.pokemon?.spriteSerebiURL;
    this.shinySpriteURL = isPixel ? this.pokemon?.spriteShinyURL : this.pokemon?.spriteSerebiShinyURL;
  }
}
