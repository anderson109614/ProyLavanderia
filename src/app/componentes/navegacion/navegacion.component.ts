import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../servicios/database.service';
import { Pedido } from '../../Models/Pedido';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, first, switchMap } from 'rxjs/operators';



import { Router } from '@angular/router';
import { Usuario } from 'src/app/Models/Usuario';
@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {
  @Input() Rol;
  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  size$: BehaviorSubject<string | null>;
  uid;
  ListaPedidosCli: any = [];
  constructor(public router: Router,
    db: AngularFireDatabase, public auteticacion: AutenticacionService, public dbServicio: DatabaseService) {

    this.size$ = new BehaviorSubject(null);
    this.items$ = this.size$.pipe(
      switchMap(size =>
        db.list('Pedidos', ref =>
          size ? ref.orderByChild('Estado').equalTo(size) : ref ||
            ref.equalTo(this.uid)

        ).snapshotChanges()
      )
    );
  }
  filtrar(est: string) {
    this.items$.subscribe(queriedItems => {
      console.log(queriedItems);
      this.ListaPedidosCli = [];
      for (let index = 0; index < queriedItems.length; index++) {
        let a = {
          User: this.dbServicio.getUsuarioUID(queriedItems[index].payload.val().Uid),
          data: queriedItems[index]
        }
        if (est.length != 0) {


          if (queriedItems[index].payload.val().Estado == est ) {

            this.ListaPedidosCli.push(a);
          }
        } else {
          
            this.ListaPedidosCli.push(a);
          
          
        }
        // this.listFiltrada.push(a);


      }
      console.log(this.ListaPedidosCli);
    });

  }
  ngOnInit() {
    this.filtrar('');
    console.log('pedidos cli',this.ListaPedidosCli);
  }
  verPDF(){
    let tamañoLetra = 12;
    let documentDefinition =
    {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      content:
      [
        {
          columns: [
            {
              // % width
              width: 200,
              text: ''
            },
            {
              // auto-sized columns have their widths based on their content
              width: 'auto',
              text: 'GESTION LAVANDERIA'
            },
            {
              // % width
              width: 200,
              text: ''
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          layout: 'lightHorizontalLines',
          // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            //[ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ]
            headerRows: 1,
            widths: [80, 80, 160, 80, 80],
            fontSize: 6,
            body: [
              [{ text: 'Fecha', fontSize: tamañoLetra },
              { text: 'Cedula', fontSize: tamañoLetra },
              { text: 'Cliente', fontSize: tamañoLetra },
              { text: 'Estado', fontSize: tamañoLetra },
              { text: 'Total', fontSize: tamañoLetra }],
              ...this.ListaPedidosCli.map(ed => {
                return [
                  { text: ed.data.payload.val().Fecha, fontSize: tamañoLetra },
                  { text: ed.User.__zone_symbol__value.Cedula, fontSize: tamañoLetra },
                  { text: ed.User.__zone_symbol__value.Nombre+" "+ed.User.__zone_symbol__value.Apellido, fontSize: tamañoLetra },
                  { text: ed.data.payload.val().Estado, fontSize: tamañoLetra },
                  { text: ed.data.payload.val().Total.toFixed(2) +" $", fontSize: tamañoLetra }];
              })

            ]
          }
        },
      ]
      
    };
    
    
    pdfMake.createPdf(documentDefinition).open();

  }

}
