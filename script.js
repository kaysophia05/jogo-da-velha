const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector("[data-board]");
let isCircleTurn;

const startgame = () =>{
    for(const cell of cellElements){
        cell.addEventListener("click", handleClick,{once:true});
    }

    isCircleTurn = false;

    board.classList.add("x")
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
  };

const swapTurn = () =>{
    isCircleTurn = !isCircleTurn;

    board.classList.remove("x");
    board.classList.remove("circle");

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
    // Verificar empate
    // Mudar o símbolo
     swapTurn();
}

startgame();
