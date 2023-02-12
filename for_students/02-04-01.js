// @ts-check
export {};

/**
 * Example 2 (Insides and Outsides) - Squares with style
 * Part C
 */
/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

//1. drawing circle
context.fillStyle = "#F8E";
context.strokeStyle = "#846";
context.lineWidth = 5;

context.beginPath();
context.arc(50, 50, 25, 0, Math.PI * 2);
context.fill();
context.stroke();

//2. drawing triangle
context.fillStyle = "sandybrown";
context.strokeStyle = "darkgoldenrod";

context.beginPath();
context.moveTo(25,150);
context.lineTo(75,150);
context.lineTo(50,110);
context.closePath();
context.fill();
context.stroke();

//3. drawing capsule
context.fillStyle = "lightpink";
context.strokeStyle = "darkred";

context.beginPath();
context.arc(125, 50, 25, 0.5 * Math.PI, 1.5 * Math.PI);
context.lineTo(175,25);
context.arc(175, 50, 25, 1.5 * Math.PI, 0.5 * Math.PI, false);
context.closePath();
context.fill();
context.stroke();

//4. drawing mountains
context.fillStyle = "gray";
context.strokeStyle = "black";

context.beginPath();
context.moveTo(100, 150);
context.lineTo(200,150);
context.lineTo(200,125);
context.lineTo(175,100);
context.lineTo(150,125);
context.lineTo(125,100);
context.lineTo(100,125);
context.closePath();
context.fill();
context.stroke();

