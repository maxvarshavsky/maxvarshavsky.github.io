class PlayerCircle extends GameObject {
  x = 30;
  width = 20;
  height = 20;
  fallSpeed = 2;

  init() {
    document.body.addEventListener('keypress', this.handleKeypress);
    this.y = this.game.height / 2;
  }

  destroy() {
    document.body.removeEventListener('keypress', this.handleKeypress);
  }

  handleKeypress = (event) => {
    if(event.key === ' ') {
      this.y -= 40;
    }
  }

  render() {
    this.y += this.fallSpeed;
    const {ctx, height} = this.game;

    if (this.y >= height || this.y <= 0) {
      this.game.over();
      return;
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.fill();
  }
}