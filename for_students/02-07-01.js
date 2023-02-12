// @ts-check
//export {};

/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box1canvas"));
let context = canvas.getContext('2d');

let discs = [];

let mouseX = -10;
let mouseY = -10;
let mouseDf = 0;

// when the mouse moves in the canvas, remember where it moves to
canvas.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;
};
// if the mouse moves outside the canvas, give an outside value
canvas.onmouseleave = function() {
    mouseX = -10;
    mouseY = -10;
    mouseDf = 0;
};
canvas.onmousedown = function(timestamp) { 
    if(mouseDf == 0 ){
        //&& discs.length == 0
        discs.push({x: mouseX,y:mouseY,color:"green",hoverColor:"yellow", hover:false, "lastTime":timestamp});
    }
    mouseDf=1;
}
canvas.onmouseup = function() { mouseDf=0; };

function drawDisc(timestamp) {
    // clear the canvas
    context.clearRect(0,0,canvas.width,canvas.height);
          
    // draw all of the dots
    discs.forEach(function(disc){
        disc.hover = Math.pow(mouseX-disc.x,2) + Math.pow(mouseY-disc.y,2) <= 100;
        if(disc.hover && mouseDf && (disc.lastTime-timestamp > 100)){
            disc.color = "red";
        }
        context.fillStyle = disc.hover?disc.hoverColor:disc.color;
        context.beginPath();
        context.arc(disc.x, disc.y, 10, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    });
    window.requestAnimationFrame(drawDisc);
}
drawDisc();