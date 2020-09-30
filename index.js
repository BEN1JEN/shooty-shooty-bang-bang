"use strict";

const canvas = {};
function init() {
    canvas.element = document.getElementById("canvas")
    canvas.context = canvas.element.getContext("2d");
    draw();
}
function draw() {
    canvas.size = {"x": window.innerWidth, "y": window.innerHeight};
    canvas.element.width = canvas.size.x;
    canvas.element.height = canvas.size.y;
    canvas.context.imageSmoothingEnabled = false;

    canvas.context.fillRect(100, 100, 200, 200);

    window.requestAnimationFrame(draw);
}

window.addEventListener("load", init);
