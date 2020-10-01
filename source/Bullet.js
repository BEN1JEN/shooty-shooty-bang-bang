"use strict";

export default class Bullet {
	constructor(playerMask, playerX, playerY, directionX, directionY, speed) {
		this.playerMask = playerMask;
		this.x = playerX;
		this.y = playerY;
		this.directionX = directionX;
		this.directionY = directionY;
		this.speed = speed;
	}
	update(world, canvas, delta) {
		this.x += this.directionX*this.speed*delta;
		this.y += this.directionY*this.speed*delta;
		canvas.context.fillRect(this.x, this.y, 5, 5);
	}
}
