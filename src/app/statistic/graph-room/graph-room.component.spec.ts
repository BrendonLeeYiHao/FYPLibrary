import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRoomComponent } from './graph-room.component';

describe('GraphRoomComponent', () => {
  let component: GraphRoomComponent;
  let fixture: ComponentFixture<GraphRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
