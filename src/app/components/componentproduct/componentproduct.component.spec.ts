import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentproductComponent } from './componentproduct.component';

describe('ComponentproductComponent', () => {
  let component: ComponentproductComponent;
  let fixture: ComponentFixture<ComponentproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentproductComponent]
    });
    fixture = TestBed.createComponent(ComponentproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
