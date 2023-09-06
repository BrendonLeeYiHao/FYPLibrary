import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicComponent } from './register-public.component';

describe('RegisterPublicComponent', () => {
  let component: RegisterPublicComponent;
  let fixture: ComponentFixture<RegisterPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPublicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
