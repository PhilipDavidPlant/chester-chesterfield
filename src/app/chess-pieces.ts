import { Player } from './player' ;
import { WhiteCharacterMap, BlackCharcterMap } from '../assets/fonts/cheq/character-maps';
import { Coordinate2D } from '../data-structures/positioning';
export abstract class ChessPiece {

    //Chess Piece Constructor
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        this.ownerOfPiece = ownerOfPiece;
        //copy values so our square and piece positions can independant
        this.position.x = position.x;
        this.position.y = position.y;
    }

    ownerOfPiece:Player;
    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    //abstract determineMoves();
    displayCharacter: string = null;
    position: Coordinate2D;

    protected determineCharacterMap(){
        if(this.ownerOfPiece.color == "white"){
            return WhiteCharacterMap;
        }else if(this.ownerOfPiece.color == "black"){
            return BlackCharcterMap;
        }
    }
}

export class Pawn extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['pawn'];
    }
}

export class Rook extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['rook'];
    }
}

export class Knight extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['knight'];
    }
}

export class Bishop extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['bishop'];
    }
}

export class King extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['king'];
    }
}

export class Queen extends ChessPiece {
    constructor(ownerOfPiece:Player, position:Coordinate2D){
        super(ownerOfPiece,position);
        this.displayCharacter = this.determineCharacterMap()['queen'];
    }
}


class SpecialMove {
    
}

class EnPassant extends SpecialMove {

}

class Castling extends SpecialMove {

}