var canvas;
var ctx;
var color = ['blue', 'green', 'yellow', 'white', 'black', 'grey', 'pink'];


//Global shape Variables
const shapeFunctions = [circle, rectangle, square, oval, triangle, line];
const sizes = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70];
const numShapes = 4;
let points = [];
let chosenShapeFunctions = [];
let currentSizeI = 0;
let currentSizeDirection = 1;
let animationLoopHandle;

//This is a function to clear the canvas
function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//This is a function to acquire a randominteger (Learned this within CS 202)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


//Makes an array and allows an onclick event to populate it with the four points on the canvas that the user clicks
function onClick(event) {
	if (points.length === numShapes) {
		return;
	}

	let canvasRect = event.target.getBoundingClientRect();
	let posX = event.clientX - canvasRect.left;
	let posY = event.clientY - canvasRect.top;
	points.push([posX, posY]);

	//This will start the animation when the fourth point is clicked
	if (points.length === numShapes) {
		clearCanvas();
		startAnimation();
	}
}

//This function starts the animation of growing the shapes and retracting them repeatedly
function startAnimation() {
	clearCanvas();

	for (let i = 0; i < numShapes; i++) {
		let shapeIndex = getRandomInt(0, shapeFunctions.length);
		chosenShapeFunctions.push(shapeFunctions[shapeIndex]);
	}

	//This function allows for the animation to have a delay using setInterval
	animationLoopHandle = setInterval(function() {
		draw();
		updateState();
	}, 250);
}

// This function makes sure that the sizes are cycled through starting from small going to big and vice versa
function updateState() {
	if (currentSizeI === 0 && currentSizeDirection === -1) {
		currentSizeDirection = 1;
	} else if (currentSizeI === sizes.length - 1 && currentSizeDirection === 1) {
		currentSizeDirection = -1;
	}
	currentSizeI += currentSizeDirection;
}

//This function is used to draw the shapes at each size and position that was clicked by the user.
function draw() {
	clearCanvas();

	for (let shapeI = 0; shapeI < numShapes; shapeI++) {
		const shapeFunction = chosenShapeFunctions[shapeI];
		const origin = points[shapeI];
		const size = sizes[currentSizeI];
		shapeFunction(origin, size);
	}
}

//This function is the initial function that is ran to set the entire process up.
function begin(){
	canvas = document.getElementById('canvasGame');
	ctx = canvas.getContext("2d");
	ctx.font = "20px Georgia";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	clearCanvas();
	ctx.fillText("Click 4 random spots within the square!", canvas.width/2, canvas.height/2);
	canvas.addEventListener('click', onClick);
}

//This function chooses a random color of the array specified in the global variables
function setRandomColor(){
	let selectedColor = color[getRandomInt(0, color.length)]
	ctx.fillStyle = selectedColor;
	ctx.strokeStyle = selectedColor;
}

//This set of functions specify what shape is being created
function circle(position, size){
	ctx.beginPath();
	setRandomColor();
	ctx.arc(position[0], position[1], size, 0,2*Math.PI);
	ctx.closePath();
	ctx.fill();
}

function rectangle(position, size){
	setRandomColor();
	ctx.fillRect(position[0] - (size / 2), position[1] - (size / 2), size * 1.5, size);
}

function square(position, size){
	setRandomColor();
	ctx.fillRect(position[0] - (size / 2), position[1] - (size / 2), size, size);
}

function oval(position, size){
	ctx.beginPath();
	setRandomColor();
	ctx.ellipse(position[0], position[1], size * 1.5, size, 0, 0, 2.0 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function triangle(position, size){
	ctx.beginPath();
	setRandomColor();

	let topOffset = [0, size];
	let top = [topOffset[0] + position[0], topOffset[1] + position[1]];
	ctx.moveTo(top[0], top[1]);

	let leftOffset = [-size, -size];
	let left = [leftOffset[0] + position[0], leftOffset[1] + position[1]];
	ctx.lineTo(left[0], left[1]);
	
	let rightOffset = [size, -size];
	let right = [rightOffset[0] + position[0], rightOffset[1] + position[1]];
	ctx.lineTo(right[0], right[1]);

	ctx.closePath();
	ctx.fill();
}

function line(position, size){
	ctx.beginPath();
	setRandomColor();

	//This is for the left side of the line
	let leftOffset = -size;
	let left = [leftOffset + position[0], position[1]];
	ctx.moveTo(left[0], left[1]);

	//This is for the right side of the line
	let rightOffset = size;
	let right = [rightOffset + position[0], position[1]];
	ctx.lineTo(right[0], right[1]);

	ctx.closePath();
	ctx.stroke();
}

//This function allows the user to see the canvas
function playButton(){
	canvas.hidden = false;
}

// Stops the animation and resets the canvas
function resetButton() {
	stopAnimation();

	points = [];
	chosenShapeFunctions = [];
	currentSizeI = 0;
	currentSizeDirection = 1;

	begin();
}

//This function pauses the animation function loop
function pauseButton() {
	stopAnimation();
}

//This is the function used for the pause button
function stopAnimation(){
	if (animationLoopHandle) {
		clearInterval(animationLoopHandle);		
	}
}