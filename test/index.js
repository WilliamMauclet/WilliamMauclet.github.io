

var rightPressed,
	leftPressed,
	downPressed,
	upPressed,
	spacePressed;
	
var imSty = document.getElementById('img').style;
	
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function init() {
	console.log("init");
	imSty.x = -100;
	imSty.y = -30;
	imSty.backgroundPositionX = imSty.x + 'px';
	imSty.backgroundPositionY = imSty.y + 'px';

	console.log(imSty);
}

function gameLoop() {
	moveImage();
	requestAnimationFrame(gameLoop);
}

function moveImage() {
	// TODO inertia!
	if (upPressed) {//forward
		//document.getElementById('img').background-position-x = '100px';
		imSty.x = imSty.x + 1;
	}
	else if (downPressed) //backward
		document.getElementById('img').style.top = '+100px';
	else if (leftPressed) //left
		document.getElementById('img').style.left = '-100px';
	else if (rightPressed) //right
		document.getElementById('img').style.left = '+100px';
	else
		return;
	
	imSty.backgroundPositionX = imSty.x + 'px';
	imSty.backgroundPositionY = imSty.y + 'px';
	
}
		
function keyDownHandler(e) {
	switch (e.keyCode) {
		case 38:
			upPressed = true;
			break;
		case 40:
			downPressed = true;
			break;
		case 37:
			leftPressed = true;
			break;
		case 39:
			rightPressed = true;
			break;
		case 32:
			spacePressed = true;
			break;
	}
}

function keyUpHandler(e) {
	switch (e.keyCode) {
		case 38:
			upPressed = false;
			break;
		case 40:
			downPressed = false;
			break;
		case 37:
			leftPressed = false;
			break;
		case 39:
			rightPressed = false;
			break;
		case 32:
			spacePressed = false;
			break;
	}
}


init();
gameLoop();