import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFeedbackModalComponent } from './room-feedback-modal.component';

describe('RoomFeedbackModalComponent', () => {
  let component: RoomFeedbackModalComponent;
  let fixture: ComponentFixture<RoomFeedbackModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomFeedbackModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
