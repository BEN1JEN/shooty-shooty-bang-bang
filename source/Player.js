"use strict";

export default class Player {
	constructor(id, world) {
		this.id = id;
		this.x = 100;
		this.y = 100;
		this.vx = 0;
		this.vy = 0;
		this.countdowns = [0, 0];
		this.world = world;
	}
	update(input, canvas, delta) {
		if (input.up) {
			this.vy -= 3000*delta;
		}
		if (input.down) {
			this.vy += 3000*delta;
		}
		if (input.left) {
			this.vx -= 3000*delta;
		}
		if (input.right) {
			this.vx += 3000*delta;
		}
		this.x += this.vx*delta;
		this.y += this.vy*delta;
		this.vx *= 0.0002**delta;
		this.vy *= 0.0002**delta;
		canvas.context.fillRect(this.x, this.y, 50, 50);
		if (input.pistol) {
			this.countdowns[0] -= delta;
			if (this.countdowns[0] < 0) {
				this.countdowns[0] = 0.1;
				console.log("shoot");
				let closestDist = Infinity, closestPlayer;
				for (const [id, player] of Object.entries(this.world.players)) {
					if (id != this.id) {
						const dist = Math.sqrt(player.x**2 + player.y**2);
						if (dist < closestDist) {
							closestDist = dist;
							closestPlayer = player;
						}
					}
				}
				let directionX = closestPlayer.x-this.x, directionY = closestPlayer.y-this.y;
				const directionDist = Math.sqrt(directionX**2 + directionY**2);
				directionX /= directionDist;
				directionY /= directionDist;
				this.world.addBullet(this.id, this.x, this.y, directionX, directionY, 1000);
			}
		}
	}
}
