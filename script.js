const gameBoard = document.querySelector(".game-board");

const cellSide = 50;
const height = Math.floor(gameBoard.clientHeight / cellSide);
const width = Math.floor(gameBoard.clientWidth / cellSide);

const Direction = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
};

let direction = Direction.UP;

const snake = {
    body: [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 5, y: 7 }],
    direction: Direction.UP
}

let food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
let isEaten = false;

function main() {
    createBoard();

    setInterval(() => {
        render();
    }, 200);

    listenForKeyPresses();
}

main();

function createBoard() {
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            gameBoard.appendChild(cell);
        }
    }
}

function render() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.classList.remove("snake"));
    snake.body.forEach(segment => {
        const index = segment.x + segment.y * width;
        cells[index].classList.add("snake");
    });

    if (direction === Direction.UP) {
        moveSnake(0, -1);
    } else if (direction === Direction.DOWN) {
        moveSnake(0, 1);
    } else if (direction === Direction.LEFT) {
        moveSnake(-1, 0);
    } else if (direction === Direction.RIGHT) {
        moveSnake(1, 0);
    }

    const foodIndex = food.x + food.y * width;
    cells[foodIndex].classList.add("food");

    const head = snake.body[0];
    if (head.x === food.x && head.y === food.y) {
        isEaten = true;
        cells[foodIndex].classList.remove("food");
        food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        const tail = snake.body[snake.body.length - 1];
        snake.body.push({ ...tail });
    }
}

function moveSnake(dx, dy) {
    const head = { ...snake.body[0] };
    head.x += dx;
    head.y += dy;
    snake.body.unshift(head);
    snake.body.pop();
}

function listenForKeyPresses() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && direction !== Direction.DOWN) {
            direction = Direction.UP;
        } else if (event.key === "ArrowDown" && direction !== Direction.UP) {
            direction = Direction.DOWN;
        } else if (event.key === "ArrowLeft" && direction !== Direction.RIGHT) {
            direction = Direction.LEFT;
        } else if (event.key === "ArrowRight" && direction !== Direction.LEFT) {
            direction = Direction.RIGHT;
        }
    });
}