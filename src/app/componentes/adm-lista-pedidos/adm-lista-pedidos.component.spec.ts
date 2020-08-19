import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmListaPedidosComponent } from './adm-lista-pedidos.component';

describe('AdmListaPedidosComponent', () => {
  let component: AdmListaPedidosComponent;
  let fixture: ComponentFixture<AdmListaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmListaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
