const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
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
    for(const cell of cellElements){    
        cell.addEventListener("click", handleClick,{once:true});
    }
    isCircleTurn = false;
    //O jogo já inicia com hover do símbolo "X"
    board.classList.add("x")
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

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

const swapTurn = () =>{
    //isCircleTurn recebe a negação do seu valor para que a mudança de símbolo posssa ser realizada
    isCircleTurn = !isCircleTurn;
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

/*
    --Etapas da função CheckForWin--
    Recebe a classe símbolo do jogador do momento
    some: Acessa e verificar todas as listas de combinações da winningCombinations
    every: acessa uma combinação e verifica se cada index daquela combinação contem o jogador do momento
    contains: Verifica pelo index se sua classe é o jogador do momento, sendo 'X' ou 'circle'
*/