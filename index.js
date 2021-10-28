//game consts and variables
let direction = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
const foodSound = new Audio('foodeat.mp3');
const gameOverSound = new Audio('gameover.mp3');
const musicSound = new Audio('musicback.mp3');
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 10 }
let score = 0;
//gamefunctions
function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
//1 updating the snake array
function isCOllide(snake) {

    //if snake nump into its body 
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true;

        }
    }
    //if you bump into the wall 
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}

function gameEngine() {
    if (isCOllide(snakearr)) {
        gameOverSound.play();
        musicSound.pause();
        direction = { x: 0, y: 0 };
        alert("GAME OVER, press any key to continue");
        snakearr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
    //if you have eaten the food then update the score and regenerate the food 
    if (snakearr[0].y == food.y && snakearr[0].x == food.x) {
        foodSound.play();
        score += 1;

        scoreBox.innerHTML = "SCORE:" + score;
        snakearr.unshift({ x: snakearr[0].x + direction.x, y: snakearr[0].y + direction.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //moving the snake 
    for (i = snakearr.length - 2; i >= 0; i--) {

        snakearr[i + 1] = { ...snakearr[i] };

    }
    snakearr[0].x += direction.x;
    snakearr[0].y += direction.y;



    //2 display the snake and food
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeelement.classList.add('head');
        }
        else {
            snakeelement.classList.add('snake');

        }
        board.appendChild(snakeelement);
    });
    //displaying the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}










//man logic 

musicSound.play();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }//start the game
    //movesound.play
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }
});
//42 mins vid end