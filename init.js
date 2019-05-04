// get canvas from HTML file
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');

// change width/height of canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// load all of our images that we use in the game

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var goblinReady = false;
var goblinImage = new Image();
goblinImage.onload = function () {
    goblinReady = true;
};
goblinImage.src = "images/monster.png";

// Coin image
var coinReady = false;
var coinImage = new Image();
coinImage.onload = function () {
    coinReady = true;
};
coinImage.src = "images/coin.png";

// Coin image
var dragonReady = false;
var dragonImage = new Image();
dragonImage.onload = function () {
    dragonReady = true;
};
dragonImage.src = "images/dragon.png";