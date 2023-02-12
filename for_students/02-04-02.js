// @ts-check
export {};

/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

//drawing reflection
context.fillStyle = "#FFDBAC";
context.strokeStyle = "#000000";
context.lineWidth = 3;

context.beginPath();
context.arc(180, 150, 50, 0, Math.PI * 2); //making head
context.fill();
context.stroke();

context.beginPath();    //making body
context.moveTo(75,300);
context.lineTo(100,200);
context.lineTo(260,200);
context.lineTo(280,300);
context.fill();
context.stroke();

//drawing mirror
context.fillStyle = "#ADD8E63F";
context.strokeStyle = "black";
context.lineWidth = 5;

context.fillRect(30,30,300,300);
context.strokeRect(30,30,300,300);

//drawing man to be reflected
context.fillStyle = "#FFDBAC";
context.strokeStyle = "#000000";
context.lineWidth = 3;

context.beginPath();
context.arc(380, 160, 50, 0, Math.PI * 2); //making head
context.fill();
context.stroke();

context.beginPath();    //making body
context.moveTo(275,310);
context.lineTo(300,210);
context.lineTo(460,210);
context.lineTo(480,310);

context.fill();
context.stroke();