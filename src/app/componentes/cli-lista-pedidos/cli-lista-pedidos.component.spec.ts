import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliListaPedidosComponent } from './cli-lista-pedidos.component';

describe('CliListaPedidosComponent', () => {
  let component: CliListaPedidosComponent;
  let fixture: ComponentFixture<CliListaPedidosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliListaPedidosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliListaPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
