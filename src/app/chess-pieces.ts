import { Player } from './player' ;
import { WhiteImageMap, BlackImageMap } from '../assets/images/image-maps';
import { Coordinate2D } from '../data-structures/positioning';

export class Collections {
    squares: Square[][] = [];
    pieces: ChessPiece[] = [];
    reticles: Reticle[] = []; 
}

export abstract class ChessPiece {

    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    imagePath: string = null;
    currentSquare: Square;

    abstract determineMoves();
    abstract determineAttacks();
    abstract initilizeChild();
    moveTo(targetSquare:Square){
        this.currentSquare = targetSquare;
        targetSquare.currentPiece = this;
        this.resetReticles();        
    }

    activate(){
        //First Deacive any other active reticles
        this.resetReticles();
        //First Deactivate other pieces
        this.currentSquare.childRetical.activate(reticalType.active);

        this.determineMoves();
    }

    //Chess Piece Constructor
    constructor(public ownerOfPiece:Player, protected collectionsRef: Collections){
        this.initilizeChild();
    }

    protected determineImage(pieceType:string):string{

        let imagesLocationPath = "../../assets/images/";

        if(this.ownerOfPiece.color == "white"){
            return imagesLocationPath + WhiteImageMap[pieceType];
        }else if(this.ownerOfPiece.color == "black"){
            return imagesLocationPath + BlackImageMap[pieceType];
        }
    }

    resetReticles(){
        this.collectionsRef.reticles.forEach(reticle => {
            reticle.deactivate();
        });
    }
}

export class Pawn extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('pawn');
    }

    determineMoves(){

        let moveValue: number;
        if(this.ownerOfPiece.color === 'white'){
            moveValue = +1;
        }else if (this.ownerOfPiece.color === 'black'){
            moveValue = -1;
        }

        let possibleXmovement = this.currentSquare.position.x + moveValue;
        let squareToCheck = this.collectionsRef.squares[possibleXmovement][this.currentSquare.position.y]
        if(squareToCheck.currentPiece === null){
            squareToCheck.childRetical.concernedPiece = this;
            squareToCheck.childRetical.activate(reticalType.move);
        }
    }

    determineAttacks(){

    }
}

export class Rook extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('rook');
    }

    determineMoves(){
    }

    determineAttacks(){
    }
}

export class Knight extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('knight');
    }

    determineMoves(){
    }

    determineAttacks(){
    }
}

export class Bishop extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('bishop');
    }

    determineMoves(){
    }

    determineAttacks(){
    }
}

export class King extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('king');
    }

    determineMoves(){
    }

    determineAttacks(){
    }
}

export class Queen extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('queen');
    }

    determineMoves(){
    }

    determineAttacks(){
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
    public position: Coordinate2D;
    public color: string;
    public currentPiece: ChessPiece = null;
    public childRetical: Reticle;
}

export class Reticle{
    constructor(public parentSquare:Square){
        parentSquare.childRetical = this;
    }
    private isActive:boolean = false;
    public type: reticalType = reticalType.active;
    public concernedPiece: ChessPiece;

    triggerAction(){
        this.concernedPiece.moveTo(this.parentSquare);
    }

    activate(type:reticalType){
        this.isActive = true;
        this.type = type;
    }

    deactivate(){
        this.isActive = false;
    }
}

enum reticalType{
    move = 1,
    attack = 2,
    active = 3,
    check = 4
}

class SpecialMove {
    
}

class EnPassant extends SpecialMove {

}

class Castling extends SpecialMove {

}