import { ChessPiece } from './chess-pieces';

export class Player {
    constructor(public color:string){}
    isInCheck: false;
    isMyTurn: false;
    chessPieces: ChessPiece[];
  }