import { Component, OnInit } from '@angular/core';
import { ChessPiece, King, Queen, Rook, Bishop, Knight, Pawn } from '../chess-pieces';
import { Player } from '../player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  placementPattern: number[][] = [
    [6,4,5,3,2,5,4,6],
    [1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [6,4,5,3,2,5,4,6]
  ];

  squares: Square[][] = [];

  whitePlayer: Player;
  blackPlayer: Player;

  selectedPlayer: Player;

  ngOnInit() {

    for(let i=0; i < 8; i++){
      this.squares[i] = [];
    }

    this.whitePlayer = new Player();
    this.blackPlayer = new Player();

    this.selectedPlayer = this.whitePlayer;

    for(let x= 0; x < 8; x++){
      for(let y= 0; y < 8; y++){
        
        let squareColor = this.determineSquareColor(x,y);

        switch(this.determinePieceToPlace(x,y)){
          case pieceType.pawn:
            this.squares[x][y] = new Square(squareColor,new Pawn());
          break;
          case pieceType.king:
            this.squares[x][y] = new Square(squareColor,new King());
          break;
          case pieceType.queen:
            this.squares[x][y] = new Square(squareColor,new Queen());
          break;
          case pieceType.knight:
            this.squares[x][y] = new Square(squareColor,new Knight());
          break;
          case pieceType.bishop:
            this.squares[x][y] = new Square(squareColor,new Bishop());
          break;
          case pieceType.rook:
            this.squares[x][y] = new Square(squareColor,new Rook());
          break;
          case pieceType.none:
            this.squares[x][y] = new Square(squareColor);
          break;
        }
      }
    }
    console.log(this.squares);
  }

  determinePieceToPlace(x:number, y:number):pieceType{
    return this.placementPattern[x][y] as pieceType;
  }

  determineSquareColor(x:number, y:number):string{

    if(x % 2 === 0){
      if(y % 2 === 0){
        return 'black';
      }else{
        return 'white';
      }
    }else{
      if(y % 2 === 0){
        return 'white';
      }else{
        return 'black';
      }
    }
  }

  flatten2DMatrix(matrixToFlatten:any[][]){
    var flattened = [];
   
    for(var i = 0; i < matrixToFlatten.length; i++)
    {
      flattened = flattened.concat(matrixToFlatten[i]);
    }
    
    return flattened;
  }

}

class Square {
  constructor(color?:string, initialPiece?:ChessPiece){
    this.color = color;
    this.currentPiece = initialPiece;
  }
  private x: number;
  private y: number;
  public color: string;
  public currentPiece: ChessPiece = null;
}

enum pieceType{
  none = 0,
  pawn = 1,
  king = 2,
  queen = 3,
  knight = 4,
  bishop = 5,
  rook = 6
}