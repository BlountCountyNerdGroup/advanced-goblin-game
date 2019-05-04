// there are good explanations for this function if you look up 
// "get random number on range javascript"
function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// this is basically the pythagorean theorem. There are Khan Academy videos on the distance formula
function getDistBetween(thing1, thing2) {
    return Math.sqrt((thing1.x - thing2.x)**2 + (thing1.y - thing2.y)**2);
}