import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmRepartidoresComponent } from './adm-repartidores.component';

describe('AdmRepartidoresComponent', () => {
  let component: AdmRepartidoresComponent;
  let fixture: ComponentFixture<AdmRepartidoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmRepartidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
