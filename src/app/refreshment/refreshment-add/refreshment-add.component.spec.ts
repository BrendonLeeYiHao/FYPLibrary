import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshmentAddComponent } from './refreshment-add.component';

describe('RefreshmentAddComponent', () => {
  let component: RefreshmentAddComponent;
  let fixture: ComponentFixture<RefreshmentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefreshmentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefreshmentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
