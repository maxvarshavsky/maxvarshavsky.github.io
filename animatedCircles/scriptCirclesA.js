var balls = [ ];

setInterval(animation, 33 )

class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.vx = Math.round(Math.random() * 20 -  10);
    this.vy = Math.round(Math.random() * 20 -  10);
    this.color = randomColor();
    this.size = 30;
  }
  draw() {
    var canvas = document.getElementById("circles");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#ffffff65";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.stroke();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

function clearCanvas() {

}
function randomColor(){
  var r = Math.floor(Math.random() * 240 + 16);
  var g = Math.floor(Math.random() * 240 + 16);
  var b = Math.floor(Math.random() * 240 + 16);
  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}

function drawC(evt){
  var canvas = document.getElementById("circles");
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  var xpos = evt.clientX - rect.left;
  var ypos = evt.clientY - rect.top;
  var newBall = new Ball(xpos, ypos);
  newBall.draw();
  balls.push(newBall);
}
function animation() {
  var canvas = document.getElementById("circles");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var n = 0; n < balls.length; n++){
    balls[n].update();
    balls[n].draw();
  }
}
