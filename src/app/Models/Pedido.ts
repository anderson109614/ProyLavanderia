import {PrendaD} from './PredaD'
export interface Pedido {
    Estado: string,
        Fecha: string,
        Prendas:[PrendaD],
        Repartidor:string,
        Total:string,
        Uid: string
    
  }