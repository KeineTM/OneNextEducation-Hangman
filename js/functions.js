/* -------------------------------------------------------------------*/
/* --------------- Variable declaration --------------- */
/* -------------------------------------------------------------------*/
// Get HTML elements
const mainFrame = document.getElementById("main-frame");
const addWordFrame = document.getElementById("add-word-frame");
const playGameFrame = document.getElementById("play-game-frame");
let newWord = document.getElementById("input-word");

// Get HTML buttons
const btnPlay = document.getElementById("btn-iniciar");
const btnNewGame = document.getElementById("btn-nuevo-juego");
const btnDesist = document.getElementById("btn-desistir");
const btnAddWord = document.getElementById("btn-agregar-palabra");
const btnCancel = document.getElementById("btn-cancelar");
const btnSaveWord = document.getElementById("btn-guardar-y-empezar");

// Other variables
const wordList = ["DESAFIO", "MUNDO", "HTML", "JAVASCRIPT", "SERVIDOR", "PROGRAMAR"];
let secretWord;
let secretWordSplited = [];
let listWrongKeys = [];
let listRightKeys = [];
let canvas = document.getElementById("canvas-game");
let pincel = canvas.getContext("2d");
let x;
let key;
let chances = 0;
let win = 0;


/* -------------------------------------------------------------------*/
/* --------------- Screen functions --------------- */
/* -------------------------------------------------------------------*/

const hideAndShowFrames = (main="", add="", play="") => {
    mainFrame.style.display = main;
    addWordFrame.style.display = add;
    playGameFrame.style.display = play;
}

/* -------------------------------------------------------------------*/
/* --------------- Canvas functions --------------- */
/* -------------------------------------------------------------------*/

// Function to clear canvas
const clearCanvas = () => pincel.clearRect(0, 0, 700, 450);

// Function to draw strokes of the hangman
const drawStroke = (x = 100, y = 200, x2 = 200, y2 = 200) => {
    pincel.lineWidth = 4;
    pincel.strokeStyle = '#0A3871';
    pincel.beginPath();
    pincel.moveTo(x,y);
    pincel.lineTo(x2,y2);
    pincel.stroke();
}

// Function to draw each piece of hangman
const drawHangman = () => {
    switch (chances) {
        case 0:
            drawStroke(202,300,202,10);
            drawStroke(200,10,350,10);
            break;
        case 1:
            drawStroke(350,8,350,30);
            drawHead();
            break;
        case 2:
            drawStroke(350,110,350,220);
            break;
        case 3:
            drawStroke(350,120,300,160);
            break;
        case 4:
            drawStroke(350,120,400,160);
            break;
        case 5:
            drawStroke(350,216,300,280);
            break;
        case 6:
            drawStroke(350,216,400,280);
            drawLetter("¡Fin del juego!", 3, "darkred", 130, 150,"32px Inter");
            drawLetter(":'(", 3, "darkred", 130, 190,"32px Inter");
            break;
    }
}

// Function to draw head of hangman
const drawHead = () => {
    pincel.strokeStyle = '#0A3871';
    pincel.beginPath();
    pincel.arc(350,70,40,0, Math.PI * 2);
    pincel.stroke();
}

// Function to draw letters
const drawLetter = (letter = "", i = 0, color = "", x = 0, y = 0, font="") => {
    // Draw the letter
    pincel.textAlign = "center";
    pincel.font = font;
    pincel.fillStyle = color;
    pincel.fillText(letter, 125+(x*i), y);
}

// Function to draw the letters of the secret word
const drawRightLetter = () => {
    // Only runs if the list of right letters' length is below or equal to word's
    if(listRightKeys.length <= secretWordSplited.length && !listRightKeys.includes(key)) {
        // Search inside secret word for letter position coincidence
        for(let i = 0; i < secretWordSplited.length; i++) {
            if(key === secretWordSplited[i]) {
                drawLetter(secretWordSplited[i], i, "#0A3871", x, 360, "36px Inter");
                listRightKeys.push(key); // Add the Key to list
            }
        }
    } 
    // If both arrays are same length, elements and position player wins
    if (listRightKeys.length === secretWordSplited.length) {
        drawLetter("¡Felicidades!", 3, "darkgreen", 130, 150,"36px Inter");
        drawLetter("Ha ganado", 3, "darkgreen", 130, 190,"36px Inter");
    }
}

// Function to draw the wrong letters and the pieces of hangman
const drawWrongLetter = (position = 0) => {
    let x2 = 550/8;
    // Only draw not repeated letters
    if(!listWrongKeys.includes(key)) {
        drawLetter(key, position, "darkred", x2, 430,"20px Inter");
        drawHangman();
        chances++; // Burn a chance
        listWrongKeys.push(key); // Add the key to list
    }
}


/* -------------------------------------------------------------------*/
/* --------------- Game functions --------------- */
/* -------------------------------------------------------------------*/

// Function to select a random word
const selectRandomWord = () => wordList[Math.floor(Math.random() * wordList.length)];

// Function to evalue key typped
const matchLetter = () => {
    // Evalue if the key typped is in the secret word
    (secretWordSplited.includes(key))
    ? drawRightLetter()
    : drawWrongLetter(chances);
}

// Function to detect key typed
const keyPressDetection = (event) => {
    // Validate that pressed key is a letter
    if ((/[a-zA-ZñÑ]/).test(event.key)){
        // Assign key to variable if it's valid
        key = event.key.toUpperCase();
        // Loop the number of chances to be wrong or match letter with secret word
        if (chances <= 6 && listRightKeys.length < secretWordSplited.length) matchLetter();
    } 
}


/* -------------------------------------------------------------------*/
/* --------------- Button's functions --------------- */
/* -------------------------------------------------------------------*/

// *** Play game button
const playGame = () => {
    // Hide and show containers
    hideAndShowFrames("none","none","block");

    // Clear the canvas
    clearCanvas();
    // Reload chances
    chances = 0;
    win = 0;
    // Clear list of keys
    listWrongKeys = [];
    listRightKeys = [];

    // Select secret word randomly
    secretWord = selectRandomWord();
    // String to array
    secretWordSplited = secretWord.split("");
    x = 550/secretWord.length;

    // Call function to draw spaces for letters
    for (let i = 0; i < secretWordSplited.length; i++) {
        drawStroke(100+(x*i),370,150+(x*i),370);
    }
    
    drawStroke(200,300,450,300);

    // Call to start key press detection
    document.addEventListener("keypress", keyPressDetection);
    
}

// *** Cancel and go back button
const cancel = () => {
    // Removes key detector event
    document.removeEventListener("keypress", keyPressDetection);

    // Clear the canvas
    clearCanvas();

    // For "Cancel button" clears input
    newWord.value = "";

    // Hide and show containers
    hideAndShowFrames("flex","none","none");
}

// *** Add a word menu button
const addWord = () => {
    // Hide and show containers
    hideAndShowFrames("none","block","none")

    // Focus on input
    newWord.focus();
}

// *** Validate new word added
const validateString = () => {
    // Regular expresion
    let regExp = new RegExp(/^[a-zA-ZñÑ]\S{3,10}$/);
    let result = false;

    // Search for text
    (!newWord.value)
        ? alert("No se ingresó ninguna palabra.")
        : (!newWord.value.match(regExp)) // If found text compares with regular expresion
            ? alert("Sólo se acepta una palabra de 4 a 10 letras sin acentos.")
            : result = true // if match, return true to confirm validation

    return result
}

// *** Save word and play button
const saveAndPlay = () => {
    // Call to function to validate the new word
    let validate = validateString();

    // If validation success
    if (validate === true) {
        // Variable to save match result
        let match = false;

        // Search for matches inside list
        for (let i = 0; i < wordList.length; i++) {
            if (newWord.value.toUpperCase() === wordList[i]) match = true;
        }

        // If match = true, it doesn't push new word, else is pushed
        (match === true)
            ? alert("La palabra ya está inscrita en la lista, intente con otra.")
            : wordList.push(newWord.value.toUpperCase());
            playGame();
    }

    // Clear input
    newWord.value = "";
}

/* -------------------------------------------------------------------*/
/* -------------------------------------------------------------------*/
window.onload = function () {
    btnPlay.onclick = playGame;
    btnNewGame.onclick = playGame;
    btnDesist.onclick = cancel;
    btnAddWord.onclick = addWord;
    btnCancel.onclick = cancel;
    btnSaveWord.onclick = saveAndPlay;
}
