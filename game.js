// Track which keys are pressed down
var keysDown = {};

// "listens" to when you push down a key
addEventListener("keydown", function (e) {

    // add the key to keysDown which we defined above
    keysDown[e.keyCode] = true;
});

// "listens" to when you let go of a key
addEventListener("keyup", function (e) {

    // delete the key from the keysDown object
    delete keysDown[e.keyCode];
});

function gameLoop() {
    // draws the green background
    ctx.fillStyle = "#567D46";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // more info about this can be found in hero.js
    hero.gameLoop();

    // more info about this can be found in goblin.js
    renderGoblins();

    // more info about this can be found in powerup.js
    renderPowerups();

    // more info about this can be found in dragon.js
    dragon.update();

    // this calls the gameLoop function (the function we're in)
    // so it basically creates a loop because this function will get called over and over again
    requestAnimationFrame(gameLoop);
}

// this initial function call starts the game
gameLoop();