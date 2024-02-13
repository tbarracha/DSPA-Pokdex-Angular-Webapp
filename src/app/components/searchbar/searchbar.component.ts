import { Component, Output, EventEmitter } from '@angular/core';
import { EventManagerService } from 'src/app/services/event-manager.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})

export class SearchBarComponent {

  constructor(private eventManager: EventManagerService)
  {
    
  }

  onSearch(inputField: HTMLInputElement, event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.eventManager.searchQuery.emit(inputField.value);
    }

    //console.log(inputField.value);
  }
}
