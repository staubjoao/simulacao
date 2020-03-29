var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

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
    if ((this.x + this.size) >= (width)) {
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

Ball.prototype.collisionDetect = function () {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function ballViss() {
    let vel = 5;
    var ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        vel,
        vel,
        'green',
        size
    );
    balls.push(ball);
}

// ctx.beginPath();
// ctx.arc(200, 200, 10, 0, 2 * Math.PI);
// ctx.stroke();
// ctx.strokeStyle = "blue";
// ctx.stroke();

// var vel = [-2, -1, 1, 2];
var vel = 1;
var balls = [];
var size = 10;

function loop() {
    ctx.fillStyle = 'rgba(0,0,0)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 200) {
        var ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            vel,
            vel,
            // vel[random(0, 3)],
            // vel[random(0, 3)],
            'blue',
            size
        );
        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}


loop();

//34