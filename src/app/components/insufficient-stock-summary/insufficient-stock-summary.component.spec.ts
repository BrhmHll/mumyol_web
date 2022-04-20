import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsufficientStockSummaryComponent } from './insufficient-stock-summary.component';

describe('InsufficientStockSummaryComponent', () => {
  let component: InsufficientStockSummaryComponent;
  let fixture: ComponentFixture<InsufficientStockSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsufficientStockSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsufficientStockSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
