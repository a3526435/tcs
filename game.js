
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
let snake = [{x: 200, y: 200}];
let food = {x: 100, y: 100};
let dx = 20;
let dy = 0;
let score = 0;

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'lime';
        ctx.fillRect(segment.x, segment.y, 20, 20);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Move the snake
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
}

// Check collisions
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Generate food
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
    food.y = Math.floor(Math.random() * (canvas.height / 20)) * 20;
}

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 10, 10);
}

// Game loop
function gameLoop() {
    if (checkCollision()) {
        alert('Game Over! Final Score: ' + score);
        document.location.reload();
    }
    moveSnake();
    drawGame();
}

// Change direction
function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && dx === 0) { // Left
        dx = -20; dy = 0;
    } else if (keyPressed === 38 && dy === 0) { // Up
        dx = 0; dy = -20;
    } else if (keyPressed === 39 && dx === 0) { // Right
        dx = 20; dy = 0;
    } else if (keyPressed === 40 && dy === 0) { // Down
        dx = 0; dy = 20;
    }
}

// Event listener
document.addEventListener('keydown', changeDirection);

// Start game
setInterval(gameLoop, 100);
