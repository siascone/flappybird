const CONSTANTS = {
    GRAVITY: 0.8,
    FLAP_SPEED: -8,
    TERMIANL_VEL: 12,
    BIRD_WIDTH: 40,
    BIRD_HEIGHT: 30
}

export default class Bird {
    constructor(dimensions) {
        this.vel = 0;
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.y = this.height/2;
        this.x = Math.floor(this.width/3);
        this.pos = [this.x, this.y];
    }

    drawBird(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
    }

    animate(ctx) {
        this.move();
        this.drawBird(ctx);
    }

    move() {
        this.y += this.vel 
        this.vel += CONSTANTS.GRAVITY;
    }   

    flap() {
        this.vel = -8
    }
}