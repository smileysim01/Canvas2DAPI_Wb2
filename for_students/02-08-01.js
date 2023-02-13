//@ts-check
export {};

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
let context = canvas.getContext('2d');

let fireworks_box = [];
let explosion_box = [];

let mouseX = -10;
let mouseY = -10;
let mouseD = 0;
let width = 0;
let height = 0;

// when the mouse moves in the canvas, remember where it moves to
canvas.onmousemove = function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
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
            fireworks_box.push({"x":x,"y":height,
                                "end_x":mouseX,"end_y":mouseY,
                                "dist":height-mouseY,
                                "vx":2, "vy":2,
                                "color":`rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
                            });
        }
        mouseD=1;
    } 
};
canvas.onmouseup = function() { mouseD=0; };

function create_explosion(x,y){
    explosion_box.push({"color":`rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`,
    "vx": (Math.random()-0.5)*2,
    "vy": (Math.random()-0.5)*2,
    "x":x,"y":y,
    });
}

function draw_explosion(){
    explosion_box.forEach(function(dot){
        dot.vx *= 1.05;
        dot.vy *= 1.05;
        dot.y -= dot.vy;
        dot.x -= dot.vx;
    });
    //filter explosion_box
    explosion_box = explosion_box.filter(
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
}

function draw_firework(){
    fireworks_box.forEach(function(dot){
        dot.vx *= 1.05;
        dot.vy *= 1.05;
        dot.y -= dot.vy;
        if((dot.dist - (dot.y-dot.end_y)) >= dot.dist){
            for(let i=0; i < Math.floor(Math.random()*10)+5; i++){
                create_explosion(dot.end_x,dot.end_y);
            }
        }
    });
    //filter dots
    fireworks_box = fireworks_box.filter(
        dot => ((dot.y>dot.end_y)&&(dot.x>0)&&(dot.x<canvas.width))
    );
    
    // draw all of the dots
    fireworks_box.forEach(function(dot){
        context.fillStyle = dot.color;
        context.beginPath();
        context.arc(dot.x,dot.y,6,0,Math.PI * 2);
        context.fill();
        context.closePath();
    });
}

function animate() {
    // clear the canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    draw_firework();
    draw_explosion();
    window.requestAnimationFrame(animate);
}

animate();
