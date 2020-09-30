"use strict";

import World from "./World.js";

const world = new World();

const canvas = {};
function init() {
    canvas.element = document.getElementById("canvas")
    canvas.context = canvas.element.getContext("2d");
    draw();
}
let lastTime = 0;
function draw(time) {
	const delta = time-lastTime;
	lastTime = time;
    canvas.size = {"x": window.innerWidth, "y": window.innerHeight};
    canvas.element.width = canvas.size.x;
    canvas.element.height = canvas.size.y;
    canvas.context.imageSmoothingEnabled = false;

    world.draw(canvas, delta/1000);

    window.requestAnimationFrame(draw);
}

window.addEventListener("load", init);
