import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFamilleComponent } from './popup-famille.component';

describe('PopupFamilleComponent', () => {
  let component: PopupFamilleComponent;
  let fixture: ComponentFixture<PopupFamilleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupFamilleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupFamilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
