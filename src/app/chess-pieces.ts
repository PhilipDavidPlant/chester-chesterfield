import { Player } from './player' ;
import { WhiteCharacterMap, BlackCharcterMap } from '../assets/fonts/cheq/character-maps';
import { Coordinate2D } from '../data-structures/positioning';
export abstract class ChessPiece {

    ownerOfPiece:Player;
    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    //abstract determineMoves();
    displayCharacter: string = null;
    currentSquare: Square;

    //Chess Piece Constructor
    constructor(ownerOfPiece:Player){
        this.ownerOfPiece = ownerOfPiece;
    }

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

export class Square {
    constructor(position:Coordinate2D, color:string, initialPiece?:ChessPiece){
      this.color = color;

      if(initialPiece !== undefined){
        this.currentPiece = initialPiece;
        this.currentPiece.currentSquare = this;
      }
      
      this.position = new Coordinate2D(position.x, position.y);
    }
    position: Coordinate2D;
    public color: string;
    public currentPiece: ChessPiece = null;
  }


class SpecialMove {
    
}

class EnPassant extends SpecialMove {

}

class Castling extends SpecialMove {

}