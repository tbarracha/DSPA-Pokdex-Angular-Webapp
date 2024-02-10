import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDisplayerComponent } from './pokemon-displayer.component';

describe('PokemonDisplayerComponent', () => {
  let component: PokemonDisplayerComponent;
  let fixture: ComponentFixture<PokemonDisplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonDisplayerComponent]
    });
    fixture = TestBed.createComponent(PokemonDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
