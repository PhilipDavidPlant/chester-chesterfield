import { Player } from './player' ;
import { WhiteImageMap, BlackImageMap } from '../assets/images/image-maps';
import { Coordinate2D } from '../data-structures/positioning';

export class Collections {
    squares: Square[][] = [];
    pieces: ChessPiece[] = [];
    reticles: Reticle[] = []; 
    whiteGraveyard: Square[] = [];
    blackGraveyard: Square[] = [];
}

export abstract class ChessPiece {

    isUnmoved:boolean = true;
    specialMoves: SpecialMove[];
    imagePath: string = null;
    currentSquare: Square;
    public isTaken: boolean = false;
    leftOffset: number = 0;
    topOffset:number = 0;

    abstract determineMoves();
    abstract initilizeChild();

    moveTo(targetSquare:Square){
        this.currentSquare.currentPiece = null;
        this.currentSquare = targetSquare;
        targetSquare.currentPiece = this;
        this.resetReticles();        
    }

    attackAt(targetSquare:Square){
        let graveyardPosition: Coordinate2D;
        let newGraveyardSqaure: Square;
        switch(targetSquare.currentPiece.ownerOfPiece.color){
            case "white":
                targetSquare.currentPiece.isTaken = true;
                targetSquare.currentPiece.leftOffset = 580;
                targetSquare.currentPiece.topOffset = 60;
                graveyardPosition = this.determineGraveyardCoordinate(this.collectionsRef.whiteGraveyard); 
                newGraveyardSqaure= new Square(graveyardPosition,targetSquare.currentPiece.ownerOfPiece.color,targetSquare.currentPiece);
                this.collectionsRef.whiteGraveyard.push(newGraveyardSqaure);
            break;
            case "black":
                targetSquare.currentPiece.isTaken = true;
                targetSquare.currentPiece.leftOffset = -180;
                targetSquare.currentPiece.topOffset = 60;
                graveyardPosition = this.determineGraveyardCoordinate(this.collectionsRef.blackGraveyard); 
                newGraveyardSqaure= new Square(graveyardPosition,targetSquare.currentPiece.ownerOfPiece.color,targetSquare.currentPiece);
                this.collectionsRef.blackGraveyard.push(newGraveyardSqaure);
            break;
        }
        this.moveTo(targetSquare);
    }

    determineGraveyardCoordinate(graveyard:any[]){
        if(graveyard.length >= 8){
            return new Coordinate2D(graveyard.length - 9,1);
        }else{
            return new Coordinate2D(graveyard.length - 1,0);  
        }
    }

    activate(){
        //First Deacive any other active reticles
        this.resetReticles();
        //First Deactivate other pieces
        this.currentSquare.childRetical.activate(reticleType.active);

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

    isInsideBounds(value:number){
        let valueInBound = true;
        if(value > 7 || value < 0){
            valueInBound = false;
        }
        return valueInBound;
    }

    resetReticles(){
        this.collectionsRef.reticles.forEach(reticle => {
            reticle.deactivate();
        });
    }

    determineDiagonalMoves(){
        
        let NorthWestOpen:boolean = true;
        let NorthEastOpen:boolean = true;
        let SouthWestOpen:boolean = true;
        let SouthEastOpen:boolean = true;

        for(let i=1;i<8;i++){
            if(SouthEastOpen){
                SouthEastOpen = this.calculateComplexMovement(i,SouthEastOpen,1,1);
            }
            if(NorthWestOpen){
                NorthWestOpen = this.calculateComplexMovement(i,NorthWestOpen,-1,-1);
            }
            if(SouthWestOpen){
                SouthWestOpen = this.calculateComplexMovement(i,SouthWestOpen,1,-1);
            }
            if(NorthEastOpen){
                NorthEastOpen = this.calculateComplexMovement(i,NorthEastOpen,-1,1,);
            }
        }
    }

    determineStrightMoves(){
        
        let NorthOpen:boolean = true;
        let EastOpen:boolean = true;
        let SouthOpen:boolean = true;
        let WestOpen:boolean = true;

        for(let i=1;i<8;i++){
            if(SouthOpen){
                SouthOpen = this.calculateComplexMovement(i,SouthOpen,1);
            }
            if(NorthOpen){
                NorthOpen = this.calculateComplexMovement(i,SouthOpen,-1);
            }
            if(EastOpen){
                EastOpen = this.calculateComplexMovement(i,SouthOpen,null,1);
            }
            if(WestOpen){
                WestOpen = this.calculateComplexMovement(i,SouthOpen,null,-1);
            }
        }
    }

    calculateComplexMovement(index:number,isSearchLockOpen:boolean, xSign?:number, ySign?:number){
        let yModifier = 0; let xModifier = 0;
        if(xSign){ xModifier = (index * xSign); }
        if(ySign){ yModifier = (index * ySign); }
        let xCoord = this.currentSquare.position.x + xModifier;
        let yCoord = this.currentSquare.position.y + yModifier;
        if(this.isInsideBounds(xCoord) && this.isInsideBounds(yCoord)){
            if(this.collectionsRef.squares[xCoord][yCoord].currentPiece == null){
                this.collectionsRef.squares[xCoord][yCoord].childRetical.activate(reticleType.move);  
                this.collectionsRef.squares[xCoord][yCoord].childRetical.concernedPiece = this;
                return true;
            }else{
                if(this.ownerOfPiece.color !== this.collectionsRef.squares[xCoord][yCoord].currentPiece.ownerOfPiece.color){
                    this.collectionsRef.squares[xCoord][yCoord].childRetical.activate(reticleType.attack);
                    this.collectionsRef.squares[xCoord][yCoord].childRetical.concernedPiece = this; 
                }           
                return false;
            }
        }
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
            squareToCheck.childRetical.activate(reticleType.move);
        }

        squareToCheck = this.collectionsRef.squares[possibleXmovement][this.currentSquare.position.y -1]
        if(squareToCheck.currentPiece != null){
            
        }
    }
}

export class Rook extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('rook');
    }

    determineMoves(){
        this.determineStrightMoves();
    }
}

export class Knight extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('knight');
    }

    determineMoves(){
        let switchXandY = false;
        let xCoord:number;
        let yCoord:number;
        for(let i=0;i<8;i++){

            debugger;

            let sign = -1;
            if(i % 2 == 0){ 
                sign = 1; 
            }

            xCoord = this.currentSquare.position.x;
            yCoord = this.currentSquare.position.y;

            let possibleX = xCoord + (sign * 2);
            let possibleY = yCoord + sign;

            if(switchXandY){ 
                let temp = possibleX;
                possibleX = possibleY;
                possibleY = possibleX;
            }

            if(this.isInsideBounds(possibleX) && this.isInsideBounds(possibleY)){
                let squareToCheck = this.collectionsRef.squares[possibleY][possibleX];
                if(squareToCheck.currentPiece === null){
                    squareToCheck.childRetical.concernedPiece = this;
                    squareToCheck.childRetical.activate(reticleType.move);
                }
            }
        }
    }

    determineAttacks(){
    }
}

export class Bishop extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('bishop');
    }

    determineMoves(){
        this.determineDiagonalMoves();
    }
}

export class King extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('king');
    }

    determineMoves(){
    }
}

export class Queen extends ChessPiece {
    
    initilizeChild(){
        this.imagePath = this.determineImage('queen');
    }

    determineMoves(){
        this.determineDiagonalMoves();
        this.determineStrightMoves();
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
    public type: reticleType = reticleType.active;
    public concernedPiece: ChessPiece;

    triggerAction(){
        switch(this.type){
            case reticleType.move:
                this.concernedPiece.moveTo(this.parentSquare);
            break;
            case reticleType.attack:
                this.concernedPiece.attackAt(this.parentSquare);
            break;
        }     
    }

    activate(type:reticleType){
        this.isActive = true;
        this.type = type;
    }

    deactivate(){
        this.isActive = false;
    }
}

enum reticleType{
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