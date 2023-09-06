import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianDeleteUpdateComponent } from './librarian-delete-update.component';

describe('LibrarianDeleteUpdateComponent', () => {
  let component: LibrarianDeleteUpdateComponent;
  let fixture: ComponentFixture<LibrarianDeleteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianDeleteUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianDeleteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
