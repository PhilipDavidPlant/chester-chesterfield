import { Component, OnInit } from '@angular/core';
import { ChessPiece, King, Queen, Rook, Bishop, Knight, Pawn } from '../chess-pieces';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  placementPattern = [5,3,4,2,1,4,3,5,0,0,0,0,0,0,0,0];

  squares: Square[] = [];

  whitePlayer: Player;
  blackPlayer: Player;

  selectedPlayer: Player;

  ngOnInit() {

    this.whitePlayer = new Player();
    this.blackPlayer = new Player();

    this.selectedPlayer = this.whitePlayer;

    for(let i=0; i < 64; i++){
      switch(this.determinePieceToPlace(i)){
        case pieceType.pawn:
          this.squares.push(new Square(new Pawn()));
        break;
        case pieceType.king:
          this.squares.push(new Square(new King()));
        break;
        case pieceType.queen:
          this.squares.push(new Square(new Queen()));
        break;
        case pieceType.knight:
          this.squares.push(new Square(new Knight()));
        break;
        case pieceType.bishop:
          this.squares.push(new Square(new Bishop()));
        break;
        case pieceType.rook:
          this.squares.push(new Square(new Rook()));
        break;
        default:
        this.squares.push(new Square());
        break;
      }
      this.squares.push()
    }
  }

  determinePieceToPlace(index:number){
    if(index < this.placementPattern.length){
      this.selectedPlayer = this.blackPlayer;
      return index;
    }else if(index > 48){
      this.selectedPlayer = this.whitePlayer;
      let reversedPattern = this.placementPattern.reverse();

    }
  }

  addPiece(){

  }

  flatten2DMatrix(matrixToFlatten:any[][]){
    var flattened = [];
   
    for(var i = 0; i < matrixToFlatten.length; i++)
    {
      flattened = flattened.concat(matrixToFlatten[i]);
    }
    
    return
  }

}

class Square {
  private x: number;
  private y: number;
  currentPiece: ChessPiece;
}

enum pieceType{
  pawn = 0,
  king = 1,
  queen = 2,
  knight = 3,
  bishop = 4,
  rook = 5,
}
