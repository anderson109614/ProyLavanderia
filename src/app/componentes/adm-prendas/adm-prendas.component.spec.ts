import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPrendasComponent } from './adm-prendas.component';

describe('AdmPrendasComponent', () => {
  let component: AdmPrendasComponent;
  let fixture: ComponentFixture<AdmPrendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPrendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPrendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
