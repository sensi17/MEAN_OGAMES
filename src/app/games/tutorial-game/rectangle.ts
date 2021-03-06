export class Rectangle{
  size: number[];
  position: number[];
  velocity: number;
  
  constructor(gl: any){
    
    // We get three random numbers and use them for new rectangle
    // size and position. For each we use a different number,
    // because we want horizontal size, vertical size and
    // position to be determined independently.
    
    var randNums = this.getRandomVector();
    
    this.size = [
      5 + 120*randNums[0],
      5 + 120*randNums[1]
    ];
    
    this.position = [
      randNums[2]*(gl.drawingBufferWidth - this.size[0]),
      gl.drawingBufferHeight
    ];
    
    this.velocity = 1.0 + 6.0*Math.random();
    var color = this.getRandomVector();
    gl.clearColor(color[0], color[1], color[2], 1.0);
  }
  
  getRandomVector(){
    return [Math.random(), Math.random(), Math.random()];
  }
}