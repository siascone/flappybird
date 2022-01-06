import Bird from "./bird";
import Level from "./level";

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.animate = this.animate.bind(this);
    this.click = this.click.bind(this);
    this.addClickListener();
    this.restart();
    // this.play();
  }

  animate() {
    this.level.animate(this.ctx)
    this.bird.animate(this.ctx)

    if (this.running) {
      requestAnimationFrame(this.animate)
    }
  }

  restart() {
    this.running = false;
    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
    this.animate();
  }

  play() {
    this.running = true;
    this.animate();
  }

  click() {
    if (!this.running) {
      this.play();
    }
    this.bird.flap();
  }

  addClickListener() {
    this.ctx.canvas.addEventListener('mousedown', this.click)
  }
}