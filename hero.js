var hero = {
    hp: 100,
    x: (canvas.width / 2), // middle of canvas
    y: (canvas.height / 2),
    HERO_VELOCITY: 5,
    SPRITE_SIZE: 32, // in pixels (the sprites are all located in the images folder)
    healthbar: getHealthBar(100, 50, 5, this.x - 10, this.y - 15), // more info in healthbar.js
    damage: 5,
    draw() {
        if (38 in keysDown || 87 in keysDown) { // Player holding up
            this.y += -this.HERO_VELOCITY;
        }
        if (40 in keysDown || 83 in keysDown) { // Player holding down
            this.y += this.HERO_VELOCITY;
        }
        if (37 in keysDown || 65 in keysDown) { // Player holding left
            this.x += -this.HERO_VELOCITY;
        }
        if (39 in keysDown || 68 in keysDown) { // Player holding right
            this.x += this.HERO_VELOCITY;
        }
    
        this.healthbar.moveTo(this.x - 10, this.y - 15)
    
        ctx.drawImage(heroImage, this.x, this.y);
    },
    isBeingHitByGoblin() {
        // loop through every goblin in the goblins array that we defined in goblins.js
        for (var i = 0; i < goblins.length; i++) {
            var goblin = goblins[i];
    
            // collision detection
            var pastLeftSide = goblin.x > this.x;
            var beforeRightSide = goblin.x < (this.x + this.SPRITE_SIZE);
            var belowTop = goblin.y > this.y;
            var aboveBottom = goblin.y < (this.y + this.SPRITE_SIZE);
    
            if (pastLeftSide && beforeRightSide && belowTop && aboveBottom) {
                return true;
            }
        }
    
        return false;
    },
    isTouchingPowerup() { // does the same as above but with powerups
        for (var i = 0; i < powerups.length; i++) {
            var powerup = powerups[i];

            // describing powerup
            var pastLeftSide = powerup.x > this.x;
            var beforeRightSide = powerup.x < this.x + this.SPRITE_SIZE;
            var belowTop = powerup.y > this.y;
            var aboveBottom = powerup.y < this.y + this.SPRITE_SIZE;

            if (pastLeftSide && beforeRightSide && belowTop && aboveBottom) {
                powerups.splice(i, 1);

                // create new powerup to replace old
                powerups.push(getPowerUp());

                return true;
            }
        }

        return false;
    },
    takeDamage() {
        this.hp -= 5;

        // more info in healthbar.js
        this.healthbar.changeHealth(this.hp);
    },
    gameLoop() {
        if (this.hp <= 0) {
            alert("You lose!") 
            location.reload();
        }

        this.draw();

        if (this.isTouchingPowerup()) {
            bulletSize = 15;
            this.damage = 20;

            // sets a timer for 4000 milliseconds (4 seconds) and then runs the code in it
            setTimeout(function() {
                bulletSize = 5;
                this.damage = 10;
            }, 4000)
        }

        if (this.isBeingHitByGoblin()) {
            this.takeDamage();
        }

        this.healthbar.draw();
        
        // more info in bullet.js
        drawBullets();
    }
}