// "listens" to when you click on your mouse
addEventListener('mousedown', function(e) {
    var mouseX = e.clientX;
    var mouseY = e.clientY;

    bulletColor = "blue";
    shoot(hero.x, hero.y, mouseX, mouseY);
});

// creates array for us to store our bullets
var bullets = [];

// global variables that we can change at any point
var bulletColor = "blue";
var bulletSize = 5;

function getBullet() {
    return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        MAX_SPEED: 10,
        radius: bulletSize,
        color: bulletColor,
        SPRITE_SIZE: 32
    }
}

function drawBullets() {
    for (var i = 0; i < bullets.length; i++) {
        var bullet = bullets[i];

        // remove bullets if off screen
        var offRightSide = bullet.x > canvas.width;
        var offLeftSide = bullet.x < 0;
        var aboveScreen = bullet.y < 0;
        var belowScreen = bullet.y > canvas.height;
        if (offRightSide || offLeftSide || aboveScreen || belowScreen) {
            // stop rendering this bullet
            bullets.splice(i, 1);

            // exit for loop
            break;
        }

        // update position
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;

        // create and draw the circle
        ctx.beginPath();
        ctx.fillStyle = bullet.color;
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// I learned this from AP Physics 1. If you want an explanation, 
// you'll have to go through the Khan Academy videos on AP Physics 1
function shoot(fromX, fromY, x, y) {
    // find distances between mouse and hero
    var dy = y - fromY;
    var dx = x - fromX;

    // split up dy & dx into vectors (direction/magnitude)
    var yDir = Math.sign(dy);
    var yMag = Math.abs(dy)

    var xDir = Math.sign(dx);
    var xMag = Math.abs(dx);

    // compute angle between mouse and hero in radians
    var theta = Math.atan(yMag/xMag);

    var bullet = getBullet();
    var spriteSize = 32;
    bullet.x = fromX + spriteSize / 2;
    bullet.y = fromY + spriteSize / 2;

    // normalize bullet speed
    bullet.vx = xDir * bullet.MAX_SPEED * Math.cos(theta);
    bullet.vy = yDir * bullet.MAX_SPEED * Math.sin(theta);

    // prepare for rendering
    bullets.push(bullet);
}