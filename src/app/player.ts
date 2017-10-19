import { ChessPiece } from './chess-pieces';

export class Player {
    constructor(color:string){
      this.color = color;
    }
    isInCheck: false;
    isMyTurn: false;
    chessPieces: ChessPiece[];
    color:string;
  }