import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendLiteratureComponent } from './lend-literature.component';

describe('LendLiteratureComponent', () => {
  let component: LendLiteratureComponent;
  let fixture: ComponentFixture<LendLiteratureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendLiteratureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
