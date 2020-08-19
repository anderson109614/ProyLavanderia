import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepListaPedidosComponent } from './rep-lista-pedidos.component';

describe('RepListaPedidosComponent', () => {
  let component: RepListaPedidosComponent;
  let fixture: ComponentFixture<RepListaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepListaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
