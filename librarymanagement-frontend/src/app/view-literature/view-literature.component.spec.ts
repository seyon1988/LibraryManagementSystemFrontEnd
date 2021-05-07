import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLiteratureComponent } from './view-literature.component';

describe('ViewLiteratureComponent', () => {
  let component: ViewLiteratureComponent;
  let fixture: ComponentFixture<ViewLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLiteratureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
