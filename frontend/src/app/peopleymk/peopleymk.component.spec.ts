import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleymkComponent } from './peopleymk.component';

describe('PeopleymkComponent', () => {
  let component: PeopleymkComponent;
  let fixture: ComponentFixture<PeopleymkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleymkComponent]
    });
    fixture = TestBed.createComponent(PeopleymkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
