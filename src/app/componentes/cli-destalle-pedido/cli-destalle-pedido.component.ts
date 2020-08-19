import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../servicios/database.service';
import { Pedido } from '../../Models/Pedido';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Usuario } from 'src/app/Models/Usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-cli-destalle-pedido',
  templateUrl: './cli-destalle-pedido.component.html',
  styleUrls: ['./cli-destalle-pedido.component.css']
})
export class CliDestallePedidoComponent implements OnInit {

  constructor( public auteticacion: AutenticacionService,public router: Router,
    private rutaActiva: ActivatedRoute, public database: DatabaseService, public dbServicio: DatabaseService) { }
  id = '';
  fecha = '';
  total = 0;
  listaPedidos: any = [];
  estado;
  usuario;
  repartidor
  async ngOnInit() {
    this.id = this.rutaActiva.snapshot.params.id;
    console.log('id', this.id);
    let us: Promise<Pedido> = this.database.getPedidoID(this.id);
    this.fecha = (await us).Fecha;
    this.total = Number.parseFloat((await us).Total);
    this.listaPedidos = (await us).Prendas;
    this.estado = (await us).Estado;
    this.usuario = this.dbServicio.getUsuarioUID((await us).Uid);
    this.repartidor = this.dbServicio.getUsuarioUID((await us).Repartidor);

    const usr = await this.auteticacion.getUserLogin();
     let us2: Promise<Usuario> = this.dbServicio.getUsuarioUID(usr.uid);
    if ((await us2).Rol != 'CLIENTE') {
      this.router.navigate(['/']);
    }
  }
  verPdf() {
    let tamañoLetra = 6;
    let documentDefinition =
    {
      pageSize: 'A8',
      pageMargins: [1, 1, 1, 1],

      content: [
        {
          columns: [
            {
              // % width
              width: 10,
              text: ''
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'LAVANDERIA A&P'
            },
            {
              // % width
              width: 10,
              text: ''
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.fecha,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'CI: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Cedula,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Nombre: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Nombre + " " + this.usuario.__zone_symbol__value.Apellido,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Email: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Email,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Direccion',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Direccion,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
       
        {
          // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            //[ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ]
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            fontSize: 6,
            body: [
              [{ text: 'Cat.', fontSize: tamañoLetra },
              { text: 'Prenda', fontSize: tamañoLetra },
              { text: 'Precio', fontSize: tamañoLetra },
              { text: 'Sub. Total', fontSize: tamañoLetra }],
              ...this.listaPedidos.map(ed => {
                return [
                  { text: ed.Cantidad, fontSize: tamañoLetra },
                  { text: ed.Nombre, fontSize: tamañoLetra },
                  { text: ed.Precio.toFixed(2), fontSize: tamañoLetra },
                  { text: ed.subTotal.toFixed(2), fontSize: tamañoLetra }];
              })

            ]
          }
        },
        
        {
          columns: [
            {
              // % width
              width: 80,
              text: ''
            },
            {
              // % width
              width: 'auto',
              text: 'Total ',
              fontSize: tamañoLetra 
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.total,
              fontSize: tamañoLetra
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        { text: "-------------------------------------------" },

      ]
    };
    
    if (this.estado != 'ENVIADO') {
      documentDefinition =
    {
      pageSize: 'A8',
      pageMargins: [1, 1, 1, 1],

      content: [
        {
          columns: [
            {
              // % width
              width: 10,
              text: ''
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'LAVANDERIA A&P'
            },
            {
              // % width
              width: 10,
              text: ''
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [

            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.fecha,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'CI: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Cedula,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Nombre: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Nombre + " " + this.usuario.__zone_symbol__value.Apellido,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Email: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Email,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Direccion',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.usuario.__zone_symbol__value.Direccion,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
       
        {
          // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            //[ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ]
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
            fontSize: 6,
            body: [
              [{ text: 'Cat.', fontSize: tamañoLetra },
              { text: 'Prenda', fontSize: tamañoLetra },
              { text: 'Precio', fontSize: tamañoLetra },
              { text: 'Sub. Total', fontSize: tamañoLetra }],
              ...this.listaPedidos.map(ed => {
                return [
                  { text: ed.Cantidad, fontSize: tamañoLetra },
                  { text: ed.Nombre, fontSize: tamañoLetra },
                  { text: ed.Precio.toFixed(2), fontSize: tamañoLetra },
                  { text: ed.subTotal.toFixed(2), fontSize: tamañoLetra }];
              })

            ]
          }
        },
        
        {
          columns: [
            {
              // % width
              width: 80,
              text: ''
            },
            {
              // % width
              width: 'auto',
              text: 'Total ',
              fontSize: tamañoLetra 
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.total,
              fontSize: tamañoLetra
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        { text: "-------------------------------------------" },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'CI: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.repartidor.__zone_symbol__value.Cedula,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // % width
              width: 28,
              text: 'Nombre: ',
              fontSize: 6
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: this.repartidor.__zone_symbol__value.Nombre + " " + this.repartidor.__zone_symbol__value.Apellido,
              fontSize: 6
            }
          ],
          // optional space between columns
          columnGap: 10
        }
      ]
    };

    }
    pdfMake.createPdf(documentDefinition).open();



  }

}
