import { GameObject } from './game-object';
import { Vector } from './vector';

export class Paddle extends GameObject {
  
  speed: number;
  
  constructor(x: number, y: number, width: number, height: number){
    super(x, y, width, height);
  }
  
}
