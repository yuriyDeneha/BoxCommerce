import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexConvertComponent } from './index-convert.component';

describe('IndexConvertComponent', () => {
  let component: IndexConvertComponent;
  let fixture: ComponentFixture<IndexConvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexConvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexConvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
