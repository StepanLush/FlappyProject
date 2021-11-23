var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
var end = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
end.src = "img/end.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.ogg";

var gap = 120;
var inteval = 0;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
var best = localStorage.getItem('BestScore');

// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 110 + inteval) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Отслеживание прикосновений
        if(xPos + bird.width - 20 >= pipe[i].x
           && xPos + 20 <= pipe[i].x + pipeUp.width
           && (yPos + 10 <= pipe[i].y + pipeUp.height
           || yPos + bird.height - 10 >= pipe[i].y + pipeUp.height + gap)
           || yPos + bird.height - 10 >= cvs.height - fg.height) {
            delete (pipe[i]);
    	 	endGame();// Перезагрузка страницы
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
            MakeFaster();
        }

        
    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);
    ctx.fillText("Рекорд: " + best, 10, cvs.height - 50);
    requestAnimationFrame(draw);
}

function endGame(){
    do {
        ctx.drawImage(end, 25, 175);
        CheckBest();
        ctx.fillText("Счет: " + score, 90, 256);
	    ctx.drawImage(fg, 0, cvs.height - fg.height);
	    document.addEventListener("keyup", Reload);
    }while(x == 1);
}

function CheckBest() {
    if (score > best) {
        ctx.fillText("Новый рекорд!", 50, 226);
        localStorage.setItem('BestScore', JSON.stringify(score));
    }
}

function Reload(){
    location.reload();
}

function MakeFaster() {
    grav += 0.01;
    if (gap > 100) {
        gap -= 2;
        inteval += 2;
    }
}

pipeBottom.onload = draw;
