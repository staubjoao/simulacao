var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

// var width = canvas.width = window.innerWidth;
// var height = canvas.height = window.innerHeight;

var width = canvas.width = 640;
var height = canvas.height = 640;

var dump = 0;
var hour = 0;
var day = 0;

function time() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("dia: "+day, 570, 20);
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.infec = function () {

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ballViss(){
    var size = 10;
    var ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        vel,
        vel,
        'red',
        size
    );
    balls.push(ball);
}


var balls = [];

var vel = 5;

function loop() {
    ctx.fillStyle = 'rgba(0,0,0)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 5) {
        var size = 10;
        var ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            vel,
            vel,
            'blue',
            size
        );
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        dump++;
        if(dump == 10){
            hour++;
            dump = 0;
        }else{

        }
        if(hour == 24){
            hour = 0;
            day++;
        }
        balls[i].draw();
        balls[i].update();
    }
    
    requestAnimationFrame(loop);
    time();
}

loop();