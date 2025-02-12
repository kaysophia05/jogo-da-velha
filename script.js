const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[restart-button]");
let isCircleTurn;
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//Função para dar inicio ao jogo, aplicando um classa a boardpara a primeira jogada de símbolo
const startgame = () =>{
    isCircleTurn = false;
    for(const cell of cellElements){   
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener("click",handleClick)
        cell.addEventListener("click", handleClick,{once:true});
    }
    //O jogo já inicia com hover do símbolo "X"
    setBoardHoverClass();
    winningMessage.classList.remove("show-winning-message");
}

//Função para aplicação da lógica do hover pela board
setBoardHoverClass = () =>{
    //Removendo a classe do simbolo que estiver no momento, para evitar o acúmulo
    board.classList.remove("x");
    board.classList.remove("circle");
    //Adicionado a classe do símbolo da vez na board, para a adição correta do hover ao mudar a vez da jogada
    if(isCircleTurn){
        board.classList.add("circle")
    } else{
        board.classList.add("x");
    }
}

const endGame = (isDraw) => {
    if (isDraw) {
      winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn
        ? "O Venceu!"
        : "X Venceu!";
    }
  
    winningMessage.classList.add("show-winning-message");
};

//Função para verificar um vitória de um player
const checkForWin = (currentPlayer) =>{
    return winningCombinations.some((combination)=>{
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const swapTurn = () =>{
    //isCircleTurn recebe a negação do seu valor para que a mudança de símbolo posssa ser realizada
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}

const handleClick = (e) =>{
    // Colocar a marca (X ou Círculo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";
    placeMark(cell,classToAdd);
    // Verificar vitória
    const isWin = checkForWin(classToAdd);
    // Verificar empate
    if(isWin){
        endGame(false);
    } 
    // Mudar o símbolo
    swapTurn();
    //--
}

startgame();
restartButton.addEventListener("click",startgame)

/*
    --Etapas da função CheckForWin--
    Recebe a classe símbolo do jogador do momento
    some: Acessa e verificar todas as listas de combinações da winningCombinations
    every: acessa uma combinação e verifica se cada index daquela combinação contem o jogador do momento
    contains: Verifica pelo index se sua classe é o jogador do momento, sendo 'X' ou 'circle'
*/

/*
    --Função setBoardHoverClass: Explicação
    Se o jogador x vencer uma rodada e o botão de reiniciar for clicado a vez "passa" a ser do circulo, 
    todavia, ocorre um conflito, pois definimos que o jogo ja se inicia com o "x"
    para evitar o bug no hover do simbolos, criamos a função com a lógica de retirar as classes da board 
    e adicionar conforme a validade do isCircleTurn (que na fnção de startgame, já iniciamos como falso)

*/ 