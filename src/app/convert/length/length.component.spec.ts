import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LengthComponent } from './length.component';

describe('LengthComponent', () => {
  let component: LengthComponent;
  let fixture: ComponentFixture<LengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LengthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
