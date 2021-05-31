class Obstacle extends GameObject {
  x = 0;
  y = 0;
  isTop = false;
  width = 100;
  height = 0;
  speed = 3;  

  constructor(isTop, height) {
    super();
    this.isTop = isTop;
    this.height = height;
  }

  init() {
    if (this.isTop) {
      this.y = 0;
    } else {
      this.y = this.game.height - this.height;
    }

    this.x = this.game.width;
  }

  checkForCollisions() {
    const {player} = this.game;

    if (player) {
      const [playerX1, playerX2] = [player.x - player.width / 2, player.x + player.width / 2];
      const [playerY1, playerY2] = [player.y - player.height / 2, player.y + player.height / 2];
      const [obsX1, obsX2] = [this.x - this.width / 2, this.x + this.width / 2];
      const [obsY1, obsY2] = [this.y, this.y + this.height];

      if (playerX2 < obsX1 || playerX1 > obsX2) return false;
      if (playerY1 > obsY2 || playerY2 < obsY1) return false;

      return true;
    }
  }

  render() {
    if (this.checkForCollisions()) {
      this.game.over();
      return;
    }

    const {ctx, height} = this.game;
    this.x -= this.speed;

    if (this.x < -this.width) {
      this.game.removeObject(this);
    }

    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2, 
      this.y, 
      this.width, 
      this.height
    );

    ctx.fill();
  }
}