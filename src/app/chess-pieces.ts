import { Player } from './player' ;
import { WhiteCharacterMap, BlackCharcterMap } from '../assets/fonts/cheq/character-maps';
export abstract class ChessPiece {

    //Chess Pice Constructor
    constructor(ownerOfPiece:Player){
        this.ownerOfPiece = ownerOfPiece;
    }

    ownerOfPiece:Player;
    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    //abstract determineMoves();
    displayCharacter: string = null;

    protected determineCharacterMap(){
        if(this.ownerOfPiece.color == "white"){
            return WhiteCharacterMap;
        }else if(this.ownerOfPiece.color == "black"){
            return BlackCharcterMap;
        }
    }
}

export class Pawn extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['pawn'];
    }
}

export class Rook extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['rook'];
    }
}

export class Knight extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['knight'];
    }
}

export class Bishop extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['bishop'];
    }
}

export class King extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['king'];
    }
}

export class Queen extends ChessPiece {
    constructor(ownerOfPiece:Player){
        super(ownerOfPiece);
        this.displayCharacter = this.determineCharacterMap()['queen'];
    }
}


class SpecialMove {
    
}

class EnPassant extends SpecialMove {

}

class Castling extends SpecialMove {

}

class Coordinate2D {
    x:number;
    y:number;
}