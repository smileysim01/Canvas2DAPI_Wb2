// @ts-check
export {};

/**
 * The more fun example
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
let context = canvas.getContext('2d');

// keep a list of squares, each with a position (x,y), a size (radius)
// and a velocity (vx,vy)
let fireworks_box = [];
let explosion_box = [];

// we want to know where the mouse is, but we only find out on movement events!
// so we'll keep some state
let mouseX = -10;
let mouseY = -10;
let mouseD = 0;
let width = 0;
let height = 0;

// when the mouse moves in the canvas, remember where it moves to
canvas.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    // unfortunately, X,Y is relative to the overall window -
    // we need the X,Y inside the canvas!
    // we know that event.target is a HTMLCanvasElement, so tell typescript
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    mouseX -= box.left;
    mouseY -= box.top;
    width = box.width;
    height = box.height;
};
// if the mouse moves outside the canvas, give an outside value
canvas.onmouseleave = function() {
    mouseX = -10;
    mouseY = -10;
    mouseD = 0;
};
canvas.onmousedown = function() { 
    if(mouseD == 0){
        if ( (mouseX > 0) && (mouseY > 0)) {
            let x = mouseX;
            //let angle = Math.atan2(mouseX-x,mouseY-height);
            fireworks_box.push({"x":x,"y":height,"end_x":mouseX,"end_y":mouseY,"vx":2, "vy":2,"color": `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`});
           // console.log("vx:"+vx+" vy:"+vy+" x:"+x+" y:"+height, " width:"+width);
           for(let i=0; i < Math.floor(Math.random()*10)+5; i++){
            create_explosion(mouseX,mouseY);
           } 
        }
        mouseD=1;
    } 
};
canvas.onmouseup = function() { mouseD=0; };

function animate() {
    // clear the canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    fireworks_box.forEach(function(dot){
        dot.vx *= 1.05;
        dot.vy *= 1.05;
        dot.y -= dot.vy;
    });
    // remove dots that have gone off the screen
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    fireworks_box = fireworks_box.filter(
        // this defines a function using "arrow notation"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        dot => ((dot.y>dot.end_y)&&(dot.x>0)&&(dot.x<canvas.width))
    );

    // draw all of the dots
    fireworks_box.forEach(function(dot){
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x,dot.y,3,0,Math.PI * 2);
        context.fill();
        context.closePath();
    });
    // explosion_box.forEach(function(){
    //     explode();
    // });
    window.requestAnimationFrame(animate);
}
//window.requestAnimationFrame(explode);
function create_explosion(x,y){
    explosion_box.push({"color":`rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
    "vx": (Math.random()-0.5)*2,
    "vy": (Math.random()-0.5)*2,
    "x":x,"y":y,
    });
}

function explode(){
    context.clearRect(0,0,canvas.width,canvas.height);
    explosion_box.forEach(function(dot){
        dot.vx *= 1.05;
        dot.vy *= 1.05;
        dot.y -= dot.vy;
        dot.x -= dot.vx;
    });
        // remove dots that have gone off the screen
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    explosion_box = explosion_box.filter(
        // this defines a function using "arrow notation"
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        dot => ((dot.y>0)&&(dot.x>0)&&(dot.x<canvas.width)&&(dot.y<canvas.height))
        );

    // draw all of the dots
    explosion_box.forEach(function(dot){
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x,dot.y,3,0,Math.PI * 2);
        context.fill();
        context.closePath();
    });
    window.requestAnimationFrame(explode);
}
animate();
//explode();
