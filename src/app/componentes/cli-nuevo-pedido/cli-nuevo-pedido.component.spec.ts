import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliNuevoPedidoComponent } from './cli-nuevo-pedido.component';

describe('CliNuevoPedidoComponent', () => {
  let component: CliNuevoPedidoComponent;
  let fixture: ComponentFixture<CliNuevoPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliNuevoPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliNuevoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
