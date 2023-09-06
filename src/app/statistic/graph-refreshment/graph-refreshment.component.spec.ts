import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRefreshmentComponent } from './graph-refreshment.component';

describe('GraphRefreshmentComponent', () => {
  let component: GraphRefreshmentComponent;
  let fixture: ComponentFixture<GraphRefreshmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphRefreshmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphRefreshmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
