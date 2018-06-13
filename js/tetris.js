var container = document.getElementById("container");
var scoreContainer = document.getElementById("score");
var newGameContainer = document.getElementById("newGameContainer");
var newGameText = document.getElementById("newGame");
var highScoreContainer = document.getElementById("highScoreContainer");
var wrapper = document.getElementById("wrapper");
var nextPieceContainer = document.getElementById("nextPieceContainer");
var score = 0;
var highScore = 0;
var position = 1;
var canMoveDown = true;
var gameLayout;
var nextShape = Math.floor(Math.random()*7);
var nextPieceArray;

function centerDisplay(){
	wrapper.style.marginTop = window.innerHeight/2 - wrapper.clientHeight/2 + "px";
}

function buildLayout(){
	var box, style;
	container.innerHTML = "";
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] == 0){
				container.innerHTML += "<div class='box'></div>";
			} else if(gameLayout[i][j] == 1 || gameLayout[i][j] == 11){
				container.innerHTML += "<div class='box cyan'></div>";
			} else if(gameLayout[i][j] == 2 || gameLayout[i][j] == 12){
				container.innerHTML += "<div class='box orange'></div>";
			} else if(gameLayout[i][j] == 3 || gameLayout[i][j] == 13){
				container.innerHTML += "<div class='box red'></div>";
			} else if(gameLayout[i][j] == 4 || gameLayout[i][j] == 14){
				container.innerHTML += "<div class='box yellow'></div>";
			} else if(gameLayout[i][j] == 5 || gameLayout[i][j] == 15){
				container.innerHTML += "<div class='box green'></div>";
			} else if(gameLayout[i][j] == 6 || gameLayout[i][j] == 16){
				container.innerHTML += "<div class='box purple'></div>";
			} else {
				container.innerHTML += "<div class='box blue'></div>";
			}
		}
		container.innerHTML += "<br>";
	}
	box = document.querySelector('.box');
	style = getComputedStyle(box);

	container.style.paddingTop = parseFloat(style.borderWidth)*2 + 'px';
	container.style.height = parseFloat(style.height)*gameLayout.length + parseFloat(style.borderWidth)*2*gameLayout.length - 4 + 'px';
	container.style.width = parseFloat(style.width)*gameLayout[0].length + parseFloat(style.borderWidth)*2*gameLayout[0].length + 'px';
	centerDisplay();
}

function buildNextPieceContainer(){
	nextPieceContainer.innerHTML = "<h5 id='nextPieceText'>NEXT PIECE:</H5>";
	for(i = 0; i < nextPieceArray.length; i++){
		for(j = 0; j < nextPieceArray[i].length; j++){
			if(nextPieceArray[i][j] == 0){
				nextPieceContainer.innerHTML += "<div class = 'box transparent'></div>";
			} else if(nextPieceArray[i][j] == 1){
				nextPieceContainer.innerHTML += "<div class = 'box cyan'></div>";
			} else if(nextPieceArray[i][j] == 2){
				nextPieceContainer.innerHTML += "<div class = 'box orange'></div>";
			} else if(nextPieceArray[i][j] == 3){
				nextPieceContainer.innerHTML += "<div class = 'box red'></div>";
			} else if(nextPieceArray[i][j] == 4){
				nextPieceContainer.innerHTML += "<div class = 'box yellow'></div>";
			} else if(nextPieceArray[i][j] == 5){
				nextPieceContainer.innerHTML += "<div class = 'box green'></div>";
			} else if(nextPieceArray[i][j] == 6){
				nextPieceContainer.innerHTML += "<div class = 'box purple'></div>";
			} else if(nextPieceArray[i][j] == 7){
				nextPieceContainer.innerHTML += "<div class = 'box blue'></div>";
			}
		}
		nextPieceContainer.innerHTML += "<br>";
	}
}

function updateScore(i){
	scoreContainer.innerHTML = "SCORE: " + i;
}

function checkRows(){
	var fullRow;
	var rowCount = 0;
	var bonus = 400;

	for(i = 0; i < gameLayout.length; i++){
		fullRow = true;
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] < 10){
				fullRow = false;
			}
		}
		if(fullRow){
			gameLayout.splice(i, 1);
			gameLayout.splice(0,0,[0,0,0,0,0,0,0,0,0,0]);
			i--;
			score += 100;
			rowCount++;
			if(rowCount == 4){
				score += bonus;
			}
		}
	}
	updateScore(score);
}

function determineNextShape(){
	nextShape = Math.floor(Math.random()*7);
	switch(nextShape){
		case 0: //I
			nextPieceArray = [
				[1,0,0],
				[1,0,0],
				[1,0,0],
				[1,0,0]
			];
			break;
		case 1: //J
			nextPieceArray = [
				[2,0,0],
				[2,2,2],
				[0,0,0]
			];
			break;
		case 2: //L
			nextPieceArray = [
				[0,0,3],
				[3,3,3],
				[0,0,0]
			];
			break;
		case 3: //O
			nextPieceArray = [
				[4,4,0],
				[4,4,0],
				[0,0,0]
			];
			break;
		case 4: //S
			nextPieceArray = [
				[0,5,5],
				[5,5,0],
				[0,0,0]
			];
			break;
		case 5: //T
			nextPieceArray = [
				[0,6,0],
				[6,6,6],
				[0,0,0]
			];
			break;
		case 6: //Z
			nextPieceArray = [
				[7,7,0],
				[0,7,7],
				[0,0,0]
			];
	}
	buildNextPieceContainer();
}

function buildIShape(){
	gameLayout[0][4] = 1;
	gameLayout[1][4] = 1;
	gameLayout[2][4] = 1;
	gameLayout[3][4] = 1;
}

function buildJShape(){
	gameLayout[0][3] = 2;
	gameLayout[1][3] = 2;
	gameLayout[1][4] = 2;
	gameLayout[1][5] = 2;
}

function buildLShape(){
	gameLayout[0][5] = 3;
	gameLayout[1][3] = 3;
	gameLayout[1][4] = 3;
	gameLayout[1][5] = 3;
}

function buildOShape(){
	gameLayout[0][4] = 4;
	gameLayout[0][5] = 4;
	gameLayout[1][4] = 4;
	gameLayout[1][5] = 4;
}

function buildSShape(){
	gameLayout[0][4] = 5;
	gameLayout[0][5] = 5;
	gameLayout[1][3] = 5;
	gameLayout[1][4] = 5;
}

function buildTShape(){
	gameLayout[0][5] = 6;
	gameLayout[1][4] = 6;
	gameLayout[1][5] = 6;
	gameLayout[1][6] = 6;
}

function buildZShape(){
	gameLayout[0][3] = 7;
	gameLayout[0][4] = 7;
	gameLayout[1][4] = 7;
	gameLayout[1][5] = 7;
}

function createNewShape(){
	position = 1;
	switch(nextShape){
		case 0: //I
			if(gameLayout[0][4]==0 && gameLayout[1][4]==0 && gameLayout[2][4]==0 && gameLayout[3][4]==0){
				buildIShape();
			} else {
				buildIShape();
				pause();
			}
			break;
		case 1: //J
			if(gameLayout[0][3]==0 && gameLayout[1][3]==0 && gameLayout[1][4]==0 &&gameLayout[1][5]==0){
				buildJShape();
			} else {
				builJShape();
				pause();
			}
			break;
		case 2: //L
			if(gameLayout[0][5]==0 && gameLayout[1][3]==0 && gameLayout[1][4]==0 && gameLayout[1][5]==0){
				buildLShape();
			} else {
				buildLShape();
				pause;
			}
			break;
		case 3: //O
			if(gameLayout[0][4]==0 && gameLayout[0][5]==0 && gameLayout[1][4]==0 && gameLayout[1][5]==0){
				buildOShape();
			} else {
				buildOShape();
				pause();
			}
			break;
		case 4: //S
			if(gameLayout[0][4]==0 && gameLayout[0][5]==0 && gameLayout[1][3]==0 && gameLayout[1][4]==0){
				buildSShape();
			} else {
				buildSShape();
				pause();
			}
			break;
		case 5: //T
			if(gameLayout[0][5]==0 && gameLayout[1][4]==0 && gameLayout[1][5]==0 && gameLayout[1][6]==0){
				buildTShape();
			} else {
				buildTShape();
				pause();
			}
			break;
		case 6: //Z
			if(gameLayout[0][3]==0 && gameLayout[0][4]==0 && gameLayout[1][4]==0 && gameLayout[1][5]==0){
				buildZShape();
			} else {
				buildZShape();
				pause();
			}
			break;
	}
	determineNextShape();
}

function rotateI(i, j){
	if(position == 1){
		if(j == 0 && gameLayout[i+1][j+1] < 10 && gameLayout[i+1][j+2] < 10 && gameLayout[i+1][j+3] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+3][j] = 0;
			gameLayout[i+1][j+1] = 1;
			gameLayout[i+1][j+2] = 1;
			gameLayout[i+1][j+3] = 1;
			position++;
		} 
		else if(j == gameLayout[i].length-1 && gameLayout[i+1][j-1] < 10 && gameLayout[i+1][j-2] < 10 && gameLayout[i+1][j-3] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+3][j] = 0;
			gameLayout[i+1][j-1] = 1;
			gameLayout[i+1][j-2] = 1;
			gameLayout[i+1][j-3] = 1;
			position++;
		}
		else if(gameLayout[i+1][j-1] < 10 && gameLayout[i+1][j+1] < 10 && gameLayout[i+1][j+2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+3][j] = 0;
			gameLayout[i+1][j-1] = 1;
			gameLayout[i+1][j+1] = 1;
			gameLayout[i+1][j+2] = 1;
			position++;
		}
	}
	else if(position == 2 && gameLayout[i+1][j+1] < 10 && gameLayout[i+2][j+1] < 10){
		gameLayout[i][j] = 0;
		gameLayout[i][j+2] = 0;
		gameLayout[i][j+3] = 0;
		gameLayout[i-1][j+1] = 1;
		gameLayout[i+1][j+1] = 1;
		gameLayout[i+2][j+1] = 1;
		position--;
	}
}

function rotateJ(i, j){
	if(position == 1){
		if(gameLayout[i][j+1] < 10 && gameLayout[i][j+2] < 10 && gameLayout[i+2][j+1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+1][j-1] = 0;
			gameLayout[i+1][j] = 0;
			gameLayout[i+1][j+2] = 0;
			gameLayout[i][j+1] = 2;
			gameLayout[i][j+2] = 2;
			gameLayout[i+2][j+1] = 2;
			position++;
		}
	}
	else if(position == 2){
		if(j == 0 && gameLayout[i+1][j+1] < 10 && gameLayout[i+1][j+2] < 10 && gameLayout[i+2][j+2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+1] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+1][j+1] = 2;
			gameLayout[i+1][j+2] = 2;
			gameLayout[i+2][j+2] = 2;
			position++;
		}
		else if(gameLayout[i+1][j+1] < 10 && gameLayout[i+2][j+1] < 10 && gameLayout[i+1][j-1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+1] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+1][j+1] = 2;
			gameLayout[i+2][j+1] = 2;
			gameLayout[i+1][j-1] = 2;
			position++;
		}
	}
	else if(position == 3){
		if(gameLayout[i+1][j] < 10 && gameLayout[i+1][j+1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+2] = 0;
			gameLayout[i+1][j+2] = 0;
			gameLayout[i-1][j+1] = 2;
			gameLayout[i+1][j] = 2;
			gameLayout[i+1][j+1] = 2;
			position++;
		}
	}
	else if(position == 4){
		if(j == gameLayout[i].length-1 && gameLayout[i+1][j-1] < 10 && gameLayout[i+1][j-2] < 10 && gameLayout[i][j-2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+2][j-1] = 0;
			gameLayout[i+1][j-1] = 2;
			gameLayout[i+1][j-2] = 2;
			gameLayout[i][j-2] = 2;
			position = 1;
		}
		else if(gameLayout[i+1][j+1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+2][j-1] = 0;
			gameLayout[i][j-1] = 2;
			gameLayout[i+1][j-1] = 2;
			gameLayout[i+1][j+1] = 2;
			position = 1;
		}
	}
}

function rotateL(i, j){
	if(position == 1){
		if(gameLayout[i+2][j] < 10 && gameLayout[i+2][j-1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+1][j-2] = 0;
			gameLayout[i+1][j] = 0;
			gameLayout[i][j-1] = 3;
			gameLayout[i+2][j-1] = 3;
			gameLayout[i+2][j] = 3;
			position++;
		}
	}
	else if(position == 2){
		if(j == 0 && gameLayout[i+1][j+1] < 10 && gameLayout[i+1][j+2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j+1] = 0;
			gameLayout[i+1][j+1] = 3;
			gameLayout[i+1][j+2] = 3;
			position++;
		}
		else if(gameLayout[i+1][j-1] < 10 && gameLayout[i+1][j+1] < 10 && gameLayout[i+2][j-1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+2][j+1] = 0;
			gameLayout[i+1][j-1] = 3;
			gameLayout[i+1][j+1] = 3;
			gameLayout[i+2][j-1] = 3;
			position++;
		}
	}
	else if(position ==3){
		if(i != 0 && gameLayout[i-1][j] < 10 && gameLayout[i-1][j+1] < 10 && gameLayout[i+1][j+1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+2] = 0;
			gameLayout[i+1][j] = 0;
			gameLayout[i-1][j] = 3;
			gameLayout[i-1][j+1] = 3;
			gameLayout[i+1][j+1] = 3;
			position++;
		}
	}
	else if(position == 4){
		if(j == gameLayout[i].length-2 && gameLayout[i+1][j-1] < 10 && gameLayout[i+1][j] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j+1] = 0;
			gameLayout[i+1][j-1] = 3;
			gameLayout[i+1][j] = 3;
			position = 1;
		}
		else if(gameLayout[i][j+2] < 10 && gameLayout[i+1][j] < 10 && gameLayout[i+1][j+2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+1] = 0;
			gameLayout[i+2][j+1] = 0;
			gameLayout[i][j+2] = 3;
			gameLayout[i+1][j] = 3;
			gameLayout[i+1][j+2] = 3;
			position = 1;
		}
	}
}

function rotateS(i, j){
	if(position == 1){
		if(gameLayout[i+2][j] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i][j+1] = 0;
			gameLayout[i][j-1] = 5;
			gameLayout[i+2][j] = 5;
			position++;
		}
	}
	else if(position == 2){
		if(j == gameLayout[i].length-2 && gameLayout[i+1][j-1] < 10){
			gameLayout[i+1][j+1] = 0;
			gameLayout[i+2][j+1] = 0;
			gameLayout[i][j+1] = 5;
			gameLayout[i+1][j-1] = 5;
			position--;
		}
		else if(gameLayout[i][j+1] < 10 && gameLayout[i][j+2] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i + 2][j+1] = 0;
			gameLayout[i][j+1] = 5;
			gameLayout[i][j+2] = 5;
			position--;
		}
	}
}

function rotateT(i, j){
	if(position == 1){
		if(i+2 <= gameLayout.length-1 && gameLayout[i+2][j] < 10){
			gameLayout[i+1][j-1] = 0;
			gameLayout[i+2][j] = 6;
			position++;
		}
	}
	else if(position == 2){
		if(j != 0 && gameLayout[i+1][j-1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+1][j-1] = 6;
			position++;
		}
		else if(gameLayout[i+1][j+2] < 10 && gameLayout[i+2][j+1] < 10) {
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i+1][j+2] = 6;
			gameLayout[i+2][j+1] = 6;
			position++;
		}
	}
	else if(position == 3){
		gameLayout[i][j+2] = 0;
		gameLayout[i-1][j+1] = 6;
		position++;
	}
	else if(position == 4){
		if(j != gameLayout[i].length && gameLayout[i+1][j+1] < 10){
			gameLayout[i+2][j] = 0;
			gameLayout[i+1][j+1] = 6;
			position = 1;
		}
		else if(gameLayout[i+1][j-2] < 10) {
			gameLayout[i][j] = 0;
			gameLayout[i+2][j] = 0;
			gameLayout[i][j-1] = 6;
			gameLayout[i+1][j-2] = 6;
			position = 1;
		}
	}
}

function rotateZ(i, j){
	if(position == 1){
		if(i != 0 && gameLayout[i+1][j] < 10){
			gameLayout[i+1][j+1] = 0;
			gameLayout[i+1][j+2] = 0;
			gameLayout[i-1][j+1] = 7;
			gameLayout[i+1][j] = 7;
			position++;
		}
	}
	else if(position == 2){
		if(j == gameLayout[i].length-1 && gameLayout[i+1][j-1]<10 && gameLayout[i+2][j] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+1][j] = 0;
			gameLayout[i+1][j-2] = 7;
			gameLayout[i+2][j] = 7;
			position--;
		}
		else if(gameLayout[i+2][j] < 10 && gameLayout[i+2][j+1] < 10){
			gameLayout[i][j] = 0;
			gameLayout[i+2][j-1] = 0;
			gameLayout[i+2][j] = 7;
			gameLayout[i+2][j+1] = 7;
			position--;
		}
	}
}

function rotateShape(){
	loop1:
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] == 1){		//"I" Shape
				rotateI(i, j);
				break loop1;
			}
			else if(gameLayout[i][j] == 2){	//"J" Shape
				rotateJ(i, j);
				break loop1;
			}
			else if(gameLayout[i][j] == 3){	//"L" Shape
				rotateL(i, j);
				break loop1;
			}
			else if(gameLayout[i][j] == 5){	//"S" Shape
				rotateS(i, j);
				break loop1;
			}
			else if(gameLayout[i][j] == 6){	//"T" Shape
				rotateT(i, j);
				break loop1;
			}
			else if(gameLayout[i][j] == 7){	//"Z" Shape
				rotateZ(i, j);
				break loop1;
			}
		}
	}
}

function findHighScore(){
	if(score > highScore){
		highScore = score;
	}
	highScoreContainer.innerHTML = "YOUR HIGH SCORE: " + highScore;
	highScoreContainer.style.display = "block";
}

function pause(){
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] > 0 && gameLayout[i][j] < 10){
				gameLayout[i][j] += 10;
			}
		}
	}
	checkRows();
	if(gameLayout[0] == "0,0,0,0,0,0,0,0,0,0"){
		createNewShape();
	} else {
		stopGameLoop();
		findHighScore();
		nextPieceContainer.style.display = "none";
		newGameContainer.style.display = "block";
		newGameText.classList.add("blinkAnimation");
	}
}

function canTheBoxMove(){
	var canMoveDown = true;

	//determine whether box can move down any further
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] > 0 && gameLayout[i][j] < 10){
				if(i == gameLayout.length-1 || gameLayout[i+1][j] > 10){
					canMoveDown = false;
					pause();
					buildLayout();
				}
			}
		}
	}
	// return canMoveDown;
}

function moveDown(){
	canTheBoxMove();	//returns canMoveDown boolean

	//move box down 1 row
	if(canMoveDown){
		for(i = gameLayout.length-1; i >= 0; i--){
			for(j = 0; j < gameLayout[i].length; j++){
				if(gameLayout[i][j] > 0 && gameLayout[i][j] <10){
					gameLayout[i + 1][j] = gameLayout[i][j];
					gameLayout[i][j] = 0;
				}
			}
		}
	}
}

function moveLeft(){
	var canMoveLeft = true;

	//determine whether box can move left any further
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] > 0 && gameLayout[i][j] < 10){
				if(j == 0 || gameLayout[i][j-1] > 10){
					canMoveLeft = false;
				}
			}
		}
	}

	//move box left 1 column
	if(canMoveLeft){
		for(i = gameLayout.length-1; i >= 0; i--){
			for(j = 0; j < gameLayout[i].length; j++){
				if(gameLayout[i][j] > 0 && gameLayout[i][j] <10){
					gameLayout[i][j-1] = gameLayout[i][j];
					gameLayout[i][j] = 0;
				}
			}
		}
	}
}

function moveRight(){
	var canMoveRight = true;

	//determine whether box can move right any further
	for(i = 0; i < gameLayout.length; i++){
		for(j = 0; j < gameLayout[i].length; j++){
			if(gameLayout[i][j] > 0 && gameLayout[i][j] < 10){
				if(j == gameLayout[i].length-1 || gameLayout[i][j+1] > 10){
					canMoveRight = false;
				}
			}
		}
	}

	//move box right 1 column
	if(canMoveRight){
		for(i = gameLayout.length-1; i >= 0; i--){
			for(j = gameLayout[i].length-1; j >= 0; j--){
				if(gameLayout[i][j] > 0 && gameLayout[i][j] <10){
					gameLayout[i][j+1] = gameLayout[i][j];
					gameLayout[i][j] = 0;
				}
			}
		}
	}
}

function quickDown(){
	while(canTheBoxMove){
		moveDown();
	}
}

document.onkeydown = function(e){
	if(e.keyCode == 37){		//arrow-left
		moveLeft();
	} 
	else if(e.keyCode == 38){	//arrow-up
		rotateShape();
	} 
	else if(e.keyCode == 39){	//arrow-right
		moveRight();
	} 
	else if(e.keyCode == 40){	//arrow-down
		moveDown();
	}
	buildLayout();
}

document.body.onkeyup = function(e){
	if(e.keyCode == 32){
		quickDown();
	}
	// buildLayout();
}

function newGame(){
	gameLayout = [
		[0,0,0,0,4,4,0,0,0,0],
		[0,0,0,0,4,4,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		// [0,0,0,0,0,0,0,0,0,0]
	];

	score = 0;
	updateScore(score);
	determineNextShape();
	buildLayout();
	newGameContainer.style.display = "none";
	highScoreContainer.style.display = "none";
	nextPieceContainer.style.display = "block";
	gameInterval = setInterval(gameLoop, 1000);
	buildNextPieceContainer();
}

newGameContainer.onclick = function(){
	newGame();
}

function gameLoop(){
	moveDown();
	buildLayout();
}

function stopGameLoop(){
	clearInterval(gameInterval);
}

window.onresize = function(){
	centerDisplay();
}

newGame();