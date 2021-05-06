import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLiteratureComponent } from './update-literature.component';

describe('UpdateLiteratureComponent', () => {
  let component: UpdateLiteratureComponent;
  let fixture: ComponentFixture<UpdateLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLiteratureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
