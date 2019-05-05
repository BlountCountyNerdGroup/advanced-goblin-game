var dragon = {
    x: hero.x + 25,
    y: hero.y,
    velocity: 4,
    update() {
        ctx.drawImage(dragonImage, this.x, this.y);
        this.moveTowardGoblin();
    },
    shootAtEnemy() {
        if (goblins.length > 0) {
            var goblin = goblins[0];
            bulletColor = "red";   
            shoot(this.x, this.y, goblin.x, goblin.y); // more info in bullet.js
        }
    },
    moveTowardGoblin() { // works the same as the function in goblin.js
        if (goblins.length > 0) {
            var goblin = goblins[0];

            if (goblin.x > this.x) {
                this.x += this.velocity;
            } else if (goblin.x < this.x) {
                this.x -= this.velocity;
            }
            
            if (goblin.y > this.y) {
                this.y += this.velocity;
            }  else if (goblin.y < this.y) {
                this.y -= this.velocity;
            }
        }
    },
}

// every 500 milliseconds (half a second), shoot a bullet
setInterval(function() {
    dragon.shootAtEnemy();
}, 150);