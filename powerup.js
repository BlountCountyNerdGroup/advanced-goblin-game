function getPowerUp() {
    var powerup = {
        x: getRandInt(0, canvas.width),
        y: getRandInt(0, canvas.height),
        SPRITE_SIZE: 32,
        draw() {
            ctx.drawImage(coinImage, this.x, this.y);
        }
    }

    return powerup;
}

var powerups = [];

var powerup = getPowerUp();
powerups.push(powerup);

// every second create a new powerup and put it in the powerups array
setInterval(function() {
    powerups.push(getPowerUp());
}, 1000);

// draw all powerups
function renderPowerups() {
    for (var i = 0; i < powerups.length; i++) {
        powerups[i].draw();
    }   
}

// wait 5 seconds, then every 1 second, remove the first powerup in the array of powerups
setTimeout(function() {
    setInterval(function() {
        if (powerups.length > 0) {
            powerups.splice(0, 1);
        }
    }, 1000);

}, 5000);