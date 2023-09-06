import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDeleteUpdateComponent } from './stock-delete-update.component';

describe('StockDeleteUpdateComponent', () => {
  let component: StockDeleteUpdateComponent;
  let fixture: ComponentFixture<StockDeleteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockDeleteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockDeleteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
