function getHealthBar(maxHP, width, height, initialX, initialY) {
    return {
        maxHP: maxHP,
        hp: maxHP,
        width: width,
        height: height,
        x: initialX,
        y: initialY,
        draw() {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        changeHealth(newHP) {
            this.hp = newHP;
            var percentage = this.hp / this.maxHP;
            this.width *= percentage;
        },
        moveTo(x, y) {
            this.x = x;
            this.y = y;
        }
    }
}