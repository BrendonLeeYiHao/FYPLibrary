import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAllComponent } from './register-all.component';

describe('RegisterAllComponent', () => {
  let component: RegisterAllComponent;
  let fixture: ComponentFixture<RegisterAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
