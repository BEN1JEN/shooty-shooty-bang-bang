"use strict";

import getInput from "./getInput.js";
import Player from "./Player.js";
import Bullet from "./Bullet.js";
import loadLevel from "./loadLevel.js";

const playerNames = [
	"[QWE]\t[ASD]",
	"[UIO]\t[JKL]",
	"[RTY]\t[FGH]",
	"[.^/]\t[<v>]",
	"[789]\t[456]",
]
export default class World {
	constructor() {
		this.players = {};
		this.bullets = [];
		this.objects = [];
		this.state = "prepare";
	}
	draw(canvas, delta) {
		const held = getInput();
		switch (this.state) {
		case "prepare":
			canvas.context.fillText("Press any key to join.", 100, 100);
			for (const player in held) {
				for (const [key, en] of Object.entries(held[player])) {
					if (en) {
						this.players[player] = new Player(parseInt(player), this);
					}
				}
			}
			let any = false;
			for (const numberStr of Object.keys(this.players)) {
				const number = parseInt(numberStr);
				canvas.context.fillText("Player " + (1+number).toString() + playerNames[number], 100, 150+number*20);
				any = true;
			}
			if (any) {
				canvas.context.fillText("Press enter to start.", 100, 120);
				if (held.menu) {
					this.state = "countdown";
					this.countdown = 3;
				}
			}
			break;
		case "countdown":
			this.countdown -= delta;
			canvas.context.fillText("Starting in " + this.countdown.toString() + " seconds.", 100, 120);
			if (this.countdown <= 0) {
				this.state = "game";
			}
			break;
		case "game":
			this.objects = [
				{type: "wall", x1: 50, y1: 50, x2: 550, y2: 100},
			];
			for (const [number, player] of Object.entries(this.players)) {
				player.update(held[number], canvas, delta);
			}
			for (const bullet of this.bullets) {
				bullet.update(this, canvas, delta);
			}
			canvas.context.lineWidth = 10;
			for (const object of Object.values(this.objects)) {
				canvas.context.beginPath();
				canvas.context.moveTo(object.x1, object.y1);
				canvas.context.lineTo(object.x2, object.y2);
				canvas.context.closePath();
				canvas.context.stroke();
			}
			break;
		}
	}
	addBullet(playerMask, playerX, playerY, directionX, directionY, speed) {
		this.bullets.push(new Bullet(playerMask, playerX, playerY, directionX, directionY, speed));
	}
}
