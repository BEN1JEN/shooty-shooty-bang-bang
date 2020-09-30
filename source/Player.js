"use strict";

export default class Player {
	constructor(id) {
		this.id = id;
		this.x = 100;
		this.y = 100;
		this.vx = 0;
		this.vy = 0;
	}
	update(input, canvas, delta) {
		if (input.up) {
			this.vy -= 1500*delta;
		}
		if (input.down) {
			this.vy += 1500*delta;
		}
		if (input.left) {
			this.vx -= 1500*delta;
		}
		if (input.right) {
			this.vx += 1500*delta;
		}
		this.x += this.vx*delta;
		this.y += this.vy*delta;
		this.vx *= 0.0005**delta;
		this.vy *= 0.0005**delta;
		canvas.context.fillRect(this.x, this.y, 50, 50);
	}
}
