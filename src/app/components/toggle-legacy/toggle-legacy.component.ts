import { Component } from '@angular/core';
import { Utils } from 'src/app/classes/utils';
import { PokemonImageDisplayStyle } from 'src/app/enums/ImageDisplayType';
import { EventManagerService } from 'src/app/services/event-manager.service';

@Component({
  selector: 'app-toggle-legacy',
  templateUrl: './toggle-legacy.component.html',
  styleUrls: ['./toggle-legacy.component.scss']
})
export class ToggleLegacyComponent {
  buttonText: string = 'Pixel';

  constructor(
    private eventManager: EventManagerService,
  ) {
    eventManager.onImageDisplayStyleChange.subscribe(this.imageDisplayStyleChanged.bind(this))
  }

  toggleLegacy()
  {
    Utils.useLegacyImg = !Utils.useLegacyImg;
    let displayType: PokemonImageDisplayStyle = Utils.useLegacyImg ? PokemonImageDisplayStyle.Pixel : PokemonImageDisplayStyle.Model3d;
    this.eventManager.onImageDisplayStyleChange.emit(displayType);
  }

  private imageDisplayStyleChanged(displayStyle: PokemonImageDisplayStyle) {
    console.log("Toggled Style: " + displayStyle);
    this.buttonText = (displayStyle == PokemonImageDisplayStyle.Model3d) ? 'Pixel' : 'Model';
  }
}
