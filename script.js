'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');

let x = 700;
let y = 800;
let length = 180;
let angle = 0;
let angleChange;

function drawTree(length, angle, x, y, width, color1, color2) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineWidth = width;
    ctx.translate(x, y);
    ctx.moveTo(0, 0);
    ctx.rotate(angle * Math.PI / 180);
    if (angle > 0) {
        ctx.bezierCurveTo(-12, -length / 2, 12, -length / 2, 0, -length);
    } else {
        ctx.bezierCurveTo(12, -length / 2, -12, -length / 2, 0, -length);
    }

    ctx.stroke();
    if (length < 5) {
        ctx.beginPath();
        ctx.arc(0, -length, 12, 0, Math.PI / 2);
        ctx.fill();
        ctx.restore();
        return;
    }
    angleChange = getRandom(10, 20);
    drawTree(length * 0.74, angle + angleChange, 0, -length, width * 0.7);
    drawTree(length * 0.74, angle - angleChange, 0, -length, width * 0.7);
    ctx.restore();
}
drawTree(length, angle, x, y, 15, 'brown', 'green');


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
