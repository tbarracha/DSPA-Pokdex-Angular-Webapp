import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-cry',
  templateUrl: './pokemon-cry.component.html',
  styleUrls: ['./pokemon-cry.component.scss']
})

export class PokemonCryComponent {
  @Input() cryUrl?: string;

  playCry() {
    const audio = new Audio(this.cryUrl);
    audio.play();
  }
}
