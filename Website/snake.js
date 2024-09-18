// Select the canvas and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the game grid size
const gridSize = 20;
let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
let direction = { x: gridSize, y: 0 };
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;
let gameOver = false;

// Generate random food position
function randomPosition() {
    return Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
}

// Update snake's position and game logic
function update() {
    if (gameOver) return;

    // Create a new head based on the current direction
    let newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    // Check for wall collisions
    if (newHead.x < 0 || newHead.x >= canvas.width || newHead.y < 0 || newHead.y >= canvas.height) {
        gameOver = true;
        return;
    }

    // Check for collisions with the snake itself
    for (let segment of snake) {
        if (newHead.x === segment.x && newHead.y === segment.y) {
            gameOver = true;
            return;
        }
    }

    // Move the snake
    snake.unshift(newHead);

    // Check if the snake has eaten the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food.x = randomPosition();
        food.y = randomPosition();
    } else {
        snake.pop(); // Remove the last part of the snake if it hasn't eaten
    }
}

// Draw the game elements on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'lime';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);

    // Check if game over
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
    }
}

// Control the snake's direction with arrow keys
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

// Game loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
}

// Start the game
gameLoop();
