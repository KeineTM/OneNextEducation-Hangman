window.onload = function() {
    /* --------------- Variable declaration --------------- */
    // HTML conteiners
    const mainFrame = document.getElementById("main-frame");
    const addWordFrame = document.getElementById("add-word-frame");
    const playGameFrame = document.getElementById("play-game-frame");

    // HTML buttons
    const btnPlay = document.getElementById("btn-iniciar");
    const btnDesist = document.getElementById("btn-desistir");
    const btnAddWord = document.getElementById("btn-agregar-palabra");
    const btnCancel = document.getElementById("btn-cancelar");

    // Other variables
    const wordList = ["HOLA", "MUNDO", "HTML", "JAVASCIRPT", "SERVIDOR"];
    let canvas = document.getElementById("canvas-game");
    let pincel = canvas.getContext("2d");

    /* --------------- Canvas's functions --------------- */
    const draw = () => {

    }

    /* --------------- Button's functions --------------- */
    // Play game
    const playGame = () => {
        // Select secret word randomly
        let secretWord = wordList[Math.floor(Math.random()*wordList.length)];
        console.log(secretWord);
        
        mainFrame.style.display = 'none';
        addWordFrame.style.display = 'none';
        playGameFrame.style.display = 'block';
    }

    // Add a word
    const addWord = () => {
        mainFrame.style.display = 'none';
        addWordFrame.style.display = 'block';
        playGameFrame.style.display = 'none';
    }

    // Save and play
    const saveAndPlay = () => {

    }

    // Cancel and go back
    const cancel = () => {
        mainFrame.style.display = 'flex';
        addWordFrame.style.display = 'none';
        playGameFrame.style.display = 'none';
    }

    btnPlay.onclick = playGame;
    btnDesist.onclick = cancel;
    btnAddWord.onclick = addWord;
    btnCancel.onclick = cancel;
}
