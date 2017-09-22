import { Player } from './player' 

export abstract class ChessPiece {

    constructor(){}
    ownerOfPiece:Player;
    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    abstract movePiece(direction:Direction)
}

export class Pawn extends ChessPiece {
    movePiece(direction:Direction){}
}

export class Rook extends ChessPiece {
    movePiece(direction:Direction){}
}

export class Knight extends ChessPiece {
    movePiece(direction:Direction){}
}

export class Bishop extends ChessPiece {
    movePiece(direction:Direction){}
}

export class King extends ChessPiece {
    movePiece(direction:Direction){}
}

export class Queen extends ChessPiece {
    movePiece(direction:Direction){}
}

enum Direction { forward, back, left, right }


class SpecialMove {
    
}