import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChessPiece, King, Queen, Rook, Bishop, Knight, Pawn, Square } from '../chess-pieces';
import { Player } from '../player';
import { Coordinate2D } from '../../data-structures/positioning';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {

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
  pieces: ChessPiece[] = [];

  whitePlayer: Player;
  blackPlayer: Player;

  selectedPlayer: Player;

  oneSquareRef:any

  ngOnInit() {

    for(let i=0; i < 8; i++){
      this.squares[i] = [];
    }

    this.whitePlayer = new Player('white');
    this.blackPlayer = new Player('black');

    this.selectedPlayer = this.whitePlayer;

    for(let x= 0; x < 8; x++){
      for(let y= 0; y < 8; y++){
        
        let squareColor:string = this.determineSquareColor(x,y);
        let newPiece:ChessPiece = null;
        let position = new Coordinate2D(x,y);

        switch(this.determinePieceToPlace(position)){
          case pieceType.pawn:
            this.addSquareWithPiece(position,squareColor, new Pawn(this.selectedPlayer));
          break;
          case pieceType.king:
            this.addSquareWithPiece(position,squareColor, new King(this.selectedPlayer));
          break;
          case pieceType.queen:
            this.addSquareWithPiece(position,squareColor, new Queen(this.selectedPlayer));            
          break;
          case pieceType.knight:
            this.addSquareWithPiece(position,squareColor, new Knight(this.selectedPlayer));            
          break;
          case pieceType.bishop:
            this.addSquareWithPiece(position,squareColor, new Bishop(this.selectedPlayer));            
          break;
          case pieceType.rook:
            this.addSquareWithPiece(position,squareColor, new Rook(this.selectedPlayer));                        
          break;
          case pieceType.none:
            this.squares[x][y] = new Square(position,squareColor);
          break;
        }
      }
    }
    //console.log(this.squares);
  }

  ngAfterViewInit(){
  }

  addSquareWithPiece(position: Coordinate2D,squareColor:string, pieceToAdd:ChessPiece){
    this.squares[position.x][position.y] = new Square(position,squareColor,pieceToAdd);
    this.pieces.push(pieceToAdd);
  }

  determinePieceToPlace(position:Coordinate2D):pieceType{
    if(position.x > 4){
      this.selectedPlayer = this.blackPlayer;
    }
    return this.placementPattern[position.x][position.y] as pieceType;
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

  findSqaureSideLength(){
    let width = 66.5;
    return width;
  }

  pieceClicked(piece: ChessPiece){
    console.log(piece);
  }

  sqaureClicked(square : Square){
    console.log(square);
  }

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