import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleShinyComponent } from './toggle-shiny.component';

describe('ToggleShinyComponent', () => {
  let component: ToggleShinyComponent;
  let fixture: ComponentFixture<ToggleShinyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleShinyComponent]
    });
    fixture = TestBed.createComponent(ToggleShinyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
