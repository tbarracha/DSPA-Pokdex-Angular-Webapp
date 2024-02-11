import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCryComponent } from './pokemon-cry.component';

describe('PokemonCryComponent', () => {
  let component: PokemonCryComponent;
  let fixture: ComponentFixture<PokemonCryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonCryComponent]
    });
    fixture = TestBed.createComponent(PokemonCryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
