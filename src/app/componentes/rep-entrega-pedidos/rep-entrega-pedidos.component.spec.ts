import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepEntregaPedidosComponent } from './rep-entrega-pedidos.component';

describe('RepEntregaPedidosComponent', () => {
  let component: RepEntregaPedidosComponent;
  let fixture: ComponentFixture<RepEntregaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepEntregaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepEntregaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
