import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphEquipmentComponent } from './graph-equipment.component';

describe('GraphEquipmentComponent', () => {
  let component: GraphEquipmentComponent;
  let fixture: ComponentFixture<GraphEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
