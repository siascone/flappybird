const CONSTANTS = {
  PIPE_SPEED: 2,
  PIPE_SPACING: 220,
  GAP: 150,
  PIPE_WIDTH: 50
}

export default class Level {
  constructor(dimensions) {
    this.dimensions = dimensions;
    const firstPipePosition = (this.dimensions.width/3) * 2
    this.pipes = [
      this.newPipe(firstPipePosition),
      this.newPipe(firstPipePosition + CONSTANTS.PIPE_SPACING),
      this.newPipe(firstPipePosition + (CONSTANTS.PIPE_SPACING *2))
    ];
  }

  drawBackground(ctx) {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
  }

  animate(ctx) {
    this.drawBackground(ctx)
    this.movePipes();
    this.drawPipes(ctx);
  }

  newPipe(x) {
    let heightRange = this.dimensions.height - CONSTANTS.GAP 
    let gapTop = (Math.random() * heightRange);
    let pipe = {
      topPipe: {
        left: x, 
        right: CONSTANTS.PIPE_WIDTH + x,
        top: 0,
        bottom: gapTop
      },
      bottomPipe: {
        left: x,
        right: CONSTANTS.PIPE_WIDTH,
        top: gapTop + CONSTANTS.GAP,
        bottom: this.dimensions.height
      }, 
      passed: false
    }
    return pipe
  }

  movePipes() {
    this.eachPipe(pipe => {
      pipe.topPipe.right -= CONSTANTS.PIPE_SPEED;
      pipe.topPipe.left -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.right -= CONSTANTS.PIPE_SPEED;
      pipe.bottomPipe.left -= CONSTANTS.PIPE_SPEED;
    })

    if (this.pipes[0].topPipe.right <= 0) {
      this.pipes.shift();
      let x = this.pipes[this.pipes.length - 1].topPipe.left + CONSTANTS.PIPE_SPACING;
      this.pipes.push(this.newPipe(x));
    }
  }

  drawPipes(ctx) {
    this.eachPipe(pipe => {
      ctx.fillStyle = 'green';

      ctx.fillRect(
        pipe.topPipe.left, 
        pipe.topPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.topPipe.bottom - pipe.topPipe.top
      )
      
      ctx.fillRect(
        pipe.bottomPipe.left, 
        pipe.bottomPipe.top,
        CONSTANTS.PIPE_WIDTH,
        pipe.bottomPipe.bottom - pipe.bottomPipe.top
      )
    })
    
  }

  eachPipe(callback) {
    this.pipes.forEach(callback.bind(this))
  }
}