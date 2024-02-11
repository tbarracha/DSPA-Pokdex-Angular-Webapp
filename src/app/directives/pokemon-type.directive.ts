import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPokemonType]'
})
export class PokemonTypeDirective {
  @Input() appPokemonType?: string[];

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    if (this.appPokemonType && this.appPokemonType.length > 0) {
      this.appPokemonType.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type;
        typeElement.classList.add(type.toLowerCase());
        this.el.nativeElement.appendChild(typeElement);
      });
    }
  }
}
