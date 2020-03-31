var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width;
var height = canvas.height;

function Ball(x, y, velX, velY, color, size, infec,
    life, daysInfc, immune) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.infec = infec;
    this.life = life;
    this.daysInfc = daysInfc;
    this.immune = immune;

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

    if (this.life) {
    } else {
        this.velX = 0;
        this.velY = 0;
    }
}

Ball.prototype.infectDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 5) {
                if (balls[j].infec) {
                    if (balls[j].immune) {

                    } else {
                        if (Math.random() < 0.17) {
                            balls[j].color = this.color = "green";
                            balls[j].infec = this.infec = true;
                            balls[j].daysInfc = 0;
                            control++;
                        }
                    }
                }
            }
        }
    }
}

Ball.prototype.contDaysInf = function () {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].infec) {
            if (balls[i].life) {
                balls[i].daysInfc++;
            }
        }
    }
}

lifeDetect = function () {
    for (let i = 0; i < balls.length; i++) {
        if (balls[i].daysInfc >= 19) {
            let d = Math.random();
            if (d < 0.66) {
            } else if (d < 0.17) {
                balls[i].color = this.color = "rgba(69, 69, 69)";
                balls[i].life = this.life = false;
                balls[i].infec = this.infec = false;
            } else if (d < 0.17) {
                balls[i].color = this.color = "red";
                balls[i].immune = this.immune = true;

            }
        }
    }
}

var control = 1;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var vel = [-2, -1, 1, 2];
var balls = [];
var size = 5;
var numBalls = 500;


function ballViss() {
    var ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        vel[random(0, 3)],
        vel[random(0, 3)],
        'green',
        size,
        true,
        true,
        random(5, 12),
        false

    );
    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0,0,0)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < numBalls) {
        var ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            vel[random(0, 3)],
            vel[random(0, 3)],
            'blue',
            size,
            false,
            true,
            0,
            false
        );
        balls.push(ball);
    }

    // for (let i = 0; i < balls.length; i++) {
    //     balls[i].draw();
    //     balls[i].update();
    //     balls[i].infectDetect();
    //     lifeDetect();
    //     for (let j = 0; j < balls.length; j++) {
    //         a++;
    //         if (a == 2500000) {
    //             balls[i].contDaysInf();
    //             a = 0;
    //         }
    //     }

    // }

    requestAnimationFrame(loop);
}
var a = 0;


loop();

//34

// ctx.beginPath();
// ctx.arc(200, 200, 10, 0, 2 * Math.PI);
// ctx.stroke();
// ctx.strokeStyle = "blue";
// ctx.stroke();

//19 days die