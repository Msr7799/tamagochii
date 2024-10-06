const state = { boredom: 0, hunger: 0, sleepiness: 0 };
let timer;
let gameOver = false;

// Cached Element References
const stats = {
    boredom: document.querySelector("#boredom-stat"),
    hunger: document.querySelector("#hunger-stat"),
    sleepiness: document.querySelector("#sleepiness-stat"),
};
const messageEl = document.querySelector("#message");
const buttons = {
    play: document.querySelector("#play"),
    feed: document.querySelector("#feed"),
    sleep: document.querySelector("#sleep"),
    reset: document.querySelector("#restart"),
};

// Initialize the game
function init() {
    gameOver = false;
    timer = setInterval(runGame, 2000);
    resetUI();
    render();
}

// Reset UI Elements
function resetUI() {
    Object.values(buttons).forEach(btn => {
        btn.classList.remove("hidden", "disable");
        btn.disabled = false;
    });
    messageEl.classList.add("hidden");
}

// Game loop
function runGame() {
    updateStates();
    checkGameOver();
    render();
}

// Update state values
function updateStates() {
    for (const key in state) {
        state[key] += Math.floor(Math.random() * 4);
    }
}

// Check if game is over
function checkGameOver() {
    gameOver = Object.values(state).some(value => value >= 10);
}

// Handle button clicks
function handleButtonClick(event) {
    const action = event.target.id;
    if (state[action] !== undefined) {
        state[action] = 0; // Reset the stat
        render();
    }
}

// Handle reset button click
function handleResetClick() {
    init();
}

// Render the UI
function render() {
    for (const key in state) {
        stats[key].textContent = state[key];
    }

    if (gameOver) {
        clearInterval(timer);
        messageEl.classList.remove("hidden");
        Object.values(buttons).forEach(btn => {
            btn.disabled = true;
            btn.classList.add("disable");
        });
    }
}

// Event Listeners
document.querySelector(".button-wrapper").addEventListener("click", handleButtonClick);
buttons.reset.addEventListener("click", handleResetClick);

// Start the game
init();