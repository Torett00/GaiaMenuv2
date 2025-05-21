import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilleeComponent } from './famillee.component';

describe('FamilleeComponent', () => {
  let component: FamilleeComponent;
  let fixture: ComponentFixture<FamilleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilleeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
