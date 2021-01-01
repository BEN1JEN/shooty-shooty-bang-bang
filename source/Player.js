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
		this.vx *= 0.0002**delta;
		this.vy *= 0.0002**delta;

		this.x += this.vx*delta;
		this.y += this.vy*delta;

		for (const object of Object.values(this.world.objects)) {
			// From https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
			const dist = Math.abs(
				(object.y2-object.y1)*this.x -
				(object.x2-object.x1)*this.y +
				object.x2*object.y1 -
				object.y2*object.y1
			) / Math.sqrt((object.x1-object.x2)**2 + (object.y1-object.y2)**2);
			if (dist < 25) {
				const objLen = Math.sqrt((object.x1-object.x2)**2 + (object.y1-object.y2)**2);
				const parX = (object.x2-object.x1)/objLen;
				const parY = (object.y2-object.y1)/objLen;
				const prpX = parY;
				const prpY = -parX;
				const dForward = this.vx*prpX + this.vy*prpY;
				const dRight = this.vx*parX + this.vy*parY;
				console.log(parX, parY, dForward, dRight);
				this.x -= this.vx*delta;
				this.y -= this.vy*delta;
				this.vx = dRight*parX;
				this.vy = dRight*parY;
				this.x += this.vx*delta;
				this.y += this.vy*delta;
				console.log("intersecting.");
			}
		}

		canvas.context.fillRect(this.x-25, this.y-25, 50, 50);
		this.countdowns[0] -= delta;
		if (input.pistol && this.countdowns[0] < 0) {
			this.countdowns[0] = 0.1;
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
