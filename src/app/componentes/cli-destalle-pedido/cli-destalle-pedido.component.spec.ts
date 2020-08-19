import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDestallePedidoComponent } from './cli-destalle-pedido.component';

describe('CliDestallePedidoComponent', () => {
  let component: CliDestallePedidoComponent;
  let fixture: ComponentFixture<CliDestallePedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliDestallePedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliDestallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
