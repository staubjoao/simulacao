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
    for(let i = 0; i < balls.length; i++){
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                let dx = this.x - balls[j].x;
                let dy = this.y - balls[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < 5) {
                    if (balls[j].infec) {
                        if (balls[j].immune) {
                        } else {
                            if (balls[j].life && this.life) {
                                if (balls[j].infec) {
                                    if (Math.random() < 0.17) {
                                        balls[j].color = this.color = "green";
                                        balls[j].infec = this.infec = true;
                                        control++;
                                    }
                                } else {
                                }
                            }
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

Ball.prototype.lifeDetect = function () {
    if (this.daysInfc >= 19) {
        var r = Math.random();
        if (this.infec) {
            if (r < 0.17) {
                this.color = "rgba(69, 69, 69)";
                this.life = false;
                this.infec = false;
            }
            else if (r > 0.34 && r < 0.51) {
                this.color = "red";
                this.immune = true;
                this.infec = false;
            }
        }
    }
};

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

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].infectDetect();
        balls[i].lifeDetect();
        for (let j = 0; j < balls.length; j++) {
            a++;
            if (a == numBalls * 10000) {
                balls[i].contDaysInf();
                a = 0;
            }
        }

    }

    requestAnimationFrame(loop);
}
var a = 0;

loop();

// var imu = 0;
// checkImune = function(){
//     for(let i = 0; i < balls.length; i++){
//         if(balls[i].color == "red"){
//             imu++;
//         }
//     }
//     return imu;
// }