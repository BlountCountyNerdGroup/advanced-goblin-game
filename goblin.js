function getGoblin() {
    var goblin = {
        hp: 100,
        x: getRandInt(0, canvas.width), // more info in helpers.js
        y: getRandInt(0, canvas.height),
        velocity: 3,
        SPRITE_SIZE: 32,
        healthbar: getHealthBar(100, 30, 5, this.x, this.y - 10), // more info in healthbar.js
        powerup: {},
        hasSeenHero: false,
        draw() {
            ctx.drawImage(goblinImage, goblin.x, goblin.y);
            this.healthbar.draw();
        },
        moveTowardPlayer() { // the code we wrote in class today
            if (hero.x > this.x) {
                this.x += this.velocity;
            }  
            if (hero.x < this.x) {
                this.x -= this.velocity;
            }

            if (hero.y > goblin.y) {
                goblin.y += goblin.velocity;
            }  else if (hero.y < goblin.y) {
                goblin.y -= goblin.velocity;
            }
        },
        moveTowardPowerup() { // same as above
            var powerup = powerups[0];

            if (powerup.x > this.x) {
                this.x += this.velocity;
            }  
            if (powerup.x < this.x) {
                this.x -= this.velocity;
            }
            
            if (powerup.y > goblin.y) {
                goblin.y += goblin.velocity;
            }  else if (powerup.y < goblin.y) {
                goblin.y -= goblin.velocity;
            }
        },
        isBeingHitByBullet() { // does collision detection for every bullet
            for (var i = 0; i < bullets.length; i++) {
                var bullet = bullets[i];

                // describing bullet
                var pastLeftSide = bullet.x > this.x;
                var beforeRightSide = bullet.x < this.x + this.SPRITE_SIZE;
                var belowTop = bullet.y > this.y;
                var aboveBottom = bullet.y < this.y + this.SPRITE_SIZE;

                if (pastLeftSide && beforeRightSide && belowTop && aboveBottom) {
                    bullets.splice(i, 1);

                    return true;
                }
            }

            return false;
        },
        isTouchingPowerup() { // same as above but for powerups
            for (var i = 0; i < powerups.length; i++) {
                var powerup = powerups[i];

                var pastLeftSide = this.x >= powerup.x;
                var beforeRightSide = this.x <= powerup.x + powerup.SPRITE_SIZE + 30;
                var belowTop = this.y >= powerup.y;
                var aboveBottom = this.y <= powerup.y + powerup.SPRITE_SIZE + 30;

                if (pastLeftSide && beforeRightSide && belowTop && aboveBottom) {
                    powerups.splice(i, 1);

                    // create new powerup to replace old one
                    powerups.push(getPowerUp());

                    return true;
                }
            }

            return false;
        },
        takeDamage() {
            this.hp -= hero.damage;
            this.healthbar.changeHealth(this.hp);
        },
        getFaster() {
            this.velocity = 5;
        },
        gameLoop() {
            if (this.isBeingHitByBullet()) {
                this.takeDamage();
            }

            if (this.isTouchingPowerup()) {
                this.getFaster();
            }

            if (getDistBetween(goblin, hero) < 250) {
                this.hasSeenHero = true;
            }

            if (this.hasSeenHero) {
                this.moveTowardPlayer();
            } else if (powerups.length > 0) {
                this.moveTowardPowerup();
            }
            
            
            this.healthbar.moveTo(this.x, this.y - 10)
            this.draw();
        }
    }

    return goblin;
}

// creates an empty array where we'll store the goblins
var goblins = [];

// pushes a single goblin into the array
goblins.push(getGoblin());

// every 5 seconds, pushes another goblin into the array
setInterval(function() {
    goblins.push(getGoblin());
}, 1000);

function renderGoblins() {
    for (var i = 0; i < goblins.length; i++) {
        var goblin = goblins[i];

        if (goblin.hp > 0) {
            goblin.gameLoop();
        } else {
            goblins.splice(i, 1);
        }
    }
}