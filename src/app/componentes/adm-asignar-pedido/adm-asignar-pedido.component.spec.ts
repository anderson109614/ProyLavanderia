import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAsignarPedidoComponent } from './adm-asignar-pedido.component';

describe('AdmAsignarPedidoComponent', () => {
  let component: AdmAsignarPedidoComponent;
  let fixture: ComponentFixture<AdmAsignarPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmAsignarPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAsignarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
