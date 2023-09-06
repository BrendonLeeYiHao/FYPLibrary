import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianBookComponent } from './librarian-book.component';

describe('LibrarianBookComponent', () => {
  let component: LibrarianBookComponent;
  let fixture: ComponentFixture<LibrarianBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrarianBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
