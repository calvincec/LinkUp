import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnepostComponent } from './onepost.component';

describe('OnepostComponent', () => {
  let component: OnepostComponent;
  let fixture: ComponentFixture<OnepostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnepostComponent]
    });
    fixture = TestBed.createComponent(OnepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
