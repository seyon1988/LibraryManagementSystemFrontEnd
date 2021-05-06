import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiteratureComponent } from './create-literature.component';

describe('CreateLiteratureComponent', () => {
  let component: CreateLiteratureComponent;
  let fixture: ComponentFixture<CreateLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLiteratureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
