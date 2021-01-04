'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const infinity = document.getElementById('infinity');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let x = canvas.width / 2;
let y = canvas.height - 100;
let angle = 0;
let angleChange;
let timer;
let length = 180;
let minLen, maxLen, maxWidth;

if (innerHeight >= 800) {
    minLen = 120;
    maxLen = 230;
    maxWidth = 40;
} else {
    length = 165;
    minLen = 110;
    maxLen = 170;
    maxWidth = 35;
};
startButton.addEventListener('click', function () {
    getRandomTree();
});
infinity.addEventListener('click', function () {
    if (timer) {
        clearTimeout(timer);
        timer = 0;
        infinity.style.color = 'black';
    } else {
        infinity.style.color = 'yellow';
        infinityMod();
    }
});



function drawTree(length, angle, x, y, width, color1, color2, color3, shadWidth) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.lineCap = 'round';
    ctx.shadowBlur = shadWidth;
    ctx.shadowColor = color3;
    ctx.lineWidth = width;
    ctx.translate(x, y);
    ctx.moveTo(0, 0);
    ctx.rotate(angle * Math.PI / 180);
    let randX = getRandom(9, 20);
    if (angle > 0) {
        ctx.bezierCurveTo(-randX, -length / 2, randX, -length / 2, 0, -length);
    } else {
        ctx.bezierCurveTo(randX, -length / 2, -randX, -length / 2, 0, -length);
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
drawTree(length, angle, x, y, 15, 'brown', 'green', 'white', 6);


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    return `rgb(${getRandom(0, 255)},${getRandom(0, 255)},${getRandom(0, 255)})`
}

function getRandomTree() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let colorTrunk = getRandomColor();
    let colorFoliage = getRandomColor();
    let colorShadow = getRandomColor();
    colorTrunk == colorFoliage ? colorFoliage = getRandomColor() : 0;
    startButton.style.background = colorTrunk;
    infinity.style.background = colorTrunk;
    infinity.style["boxShadow"] = `0 4px ${colorFoliage}`;
    startButton.style["boxShadow"] = `0 4px ${colorFoliage}`;
    startButton.style.borderColor = colorShadow;
    drawTree(getRandom(minLen, maxLen), angle, x, y, getRandom(10, maxWidth), colorTrunk, colorFoliage, colorShadow, getRandom(6, 15));
}
function infinityMod() {
    timer = setTimeout(function () {
        getRandomTree();
        infinityMod();
        console.log('sek');
    }, 4000);
}