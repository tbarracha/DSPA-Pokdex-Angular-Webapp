import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonListElementComponent } from './pokemon-list-element.component';

describe('PokemonListElementComponent', () => {
  let component: PokemonListElementComponent;
  let fixture: ComponentFixture<PokemonListElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonListElementComponent]
    });
    fixture = TestBed.createComponent(PokemonListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
