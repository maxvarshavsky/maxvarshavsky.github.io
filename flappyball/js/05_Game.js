class Game {
  canvas = null;
  ctx = null;

  width = 0;
  height = 0;
  objects = new Set();
  keepRendering = false;
  time = 0;

  newObstacleTimeout = null;
  player = null;

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.objects.forEach(object => {
      if (this.keepRendering) {
        object.render();
      }
    });

    if (this.keepRendering) {
      requestAnimationFrame((timestamp) => {
        this.time = timestamp;
        this.render();
      });
    }
  }

  over() {
    this.ctx.font = '50px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.width / 2, this.height / 2);

    this.end();
  }

  init() {
    this.time = 0;
    this.createScene();
    this.keepRendering = true;
    this.render();
  }

  end() {
    this.keepRendering = false;
    clearTimeout(this.newObstacleTimeout);
    this.objects.forEach((obj) => this.removeObject(obj));
  }

  removeObject(obj) {
    obj.destroy();
    this.objects.delete(obj);
  }

  addObject(obj) {
    obj.setGame(this);
    obj.init();
    this.objects.add(obj);
  }

  createScene() {
    this.player = new PlayerCircle();
    this.addObject(this.player);

    const addObstacle = () => {
      this.addObject(new Obstacle(random(0, 100) < 50, random(100, 250)));
      this.newObstacleTimeout = setTimeout(addObstacle, 3000);
    }

    addObstacle();
  }
}
