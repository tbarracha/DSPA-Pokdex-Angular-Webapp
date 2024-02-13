import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleLegacyComponent } from './toggle-legacy.component';

describe('ToggleLegacyComponent', () => {
  let component: ToggleLegacyComponent;
  let fixture: ComponentFixture<ToggleLegacyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleLegacyComponent]
    });
    fixture = TestBed.createComponent(ToggleLegacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
