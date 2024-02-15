const INITIAL_SIZE =  16;
const CONTAINER_SIZE = 800;
const SIZE_LIMIT = 100;
const MAX_COLOR = 256;
const DARKENING_INCR = 1/11;

const container = document.querySelector('.container');
const changeSizeButton = document.querySelector('#change-size-button');

const randomNumber = (max) => Math.floor(max * Math.random());
const randomColor = (max) => `rgb(${randomNumber(max)}, ${randomNumber(max)}, ${randomNumber(max)})`;

const drawGrid = (size) => {
    container.innerHTML = '';
    let squareSize = CONTAINER_SIZE/size;
    for (let i=0; i < size; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j=0; j < size; j++) {
            const square = document.createElement('div');
            square.style.width = squareSize + 'px';
            square.style.height = squareSize + 'px';
            square.classList.add('square');
            if (i == size - 1) square.classList.add('bottom-row');
            if (j == size - 1) square.classList.add('right-column');
            square.dataset.maxColor = MAX_COLOR;
            square.addEventListener('mouseover', (event) => {
                square.dataset.maxColor = Math.max(0,+square.dataset.maxColor - DARKENING_INCR * MAX_COLOR);
                event.target.style.backgroundColor = randomColor(+square.dataset.maxColor);
            });
            row.appendChild(square)
        }
        container.appendChild(row);
    }
};

changeSizeButton.addEventListener('click', () => {
    let newSize = Math.min(
        SIZE_LIMIT, 
        prompt('How many squares would you like per side (limit 100)?')
    );
    drawGrid(newSize);
});

window.addEventListener('DOMContentLoaded', () => {
    container.style.width = CONTAINER_SIZE + 'px';
    container.style.height = CONTAINER_SIZE + 'px';
    drawGrid(INITIAL_SIZE);
});

// drawGrid(INITIAL_SIZE);