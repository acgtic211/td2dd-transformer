import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WotFormComponent } from './wot-form.component';

describe('WotFormComponent', () => {
  let component: WotFormComponent;
  let fixture: ComponentFixture<WotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
