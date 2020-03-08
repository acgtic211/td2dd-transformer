import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdResponseComponent } from './dd-response.component';

describe('DdResponseComponent', () => {
  let component: DdResponseComponent;
  let fixture: ComponentFixture<DdResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
