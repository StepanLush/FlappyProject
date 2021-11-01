var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");



var gap = 90;


function moveUp() {
 yPos -= 25;
 fly.play();
}



var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

