import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshmentDeleteUpdateComponent } from './refreshment-delete-update.component';

describe('RefreshmentDeleteUpdateComponent', () => {
  let component: RefreshmentDeleteUpdateComponent;
  let fixture: ComponentFixture<RefreshmentDeleteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshmentDeleteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshmentDeleteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
