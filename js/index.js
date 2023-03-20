// Chiamo elementi del DOM

const squareGrid = document.querySelector("#play-grid");
const btn = document.querySelector("#btn-play");
const btnAgain = document.querySelector("#btn-again");
const result = document.querySelector("#result");
let resultCont = document.querySelector(".result-cont");
let PopUpRes = document.querySelector("#Pop-up-result");
let PopUpH3 = document.querySelector("#Pop-up-result h3");
let PopUpUl = document.querySelector("#Pop-up-result ul");
let iconNoCheck = document.querySelector("#icon-nocheck");
let iconCheck = document.querySelector("#icon-check");

//Variabili globali
let n = 0
const numBombs = 16;
let numSquares = 0;
let squareSqrt;
let bombsCheck;



// Eventi click - Inizio Game - - 
btn.addEventListener("click", playGenerate)
btnAgain.addEventListener("click", restartFlow);


// Funzione Di inizio partita
function playGenerate(e){
    e.preventDefault()
    squareGrid.innerHTML= "";
    bombsCheck = false
    n = 0
    resultCont.classList.add("CM-display")
    let levelInput = document.querySelector("#level").value;
    switch(levelInput){
        case "simple":
            numSquares = 100;
            break;
        case "medium":
            numSquares = 81;
            break;
        case "difficult":
            numSquares = 49;
            break;
    }
    squareSqrt = Math.sqrt(numSquares)

    // Generazione bomba
    const bombs = generateBombs(numBombs , numSquares)
    console.log(bombs)
    
    for(let i = 1; i <= numSquares; i++){
        // Generazione Square
        const squareCheck = createSquare(squareSqrt, i)
        // Evento click Square
        clickColorSquare(squareCheck, bombs) 
    }
    
}

// Funzione evento click Square - true or false
function clickColorSquare(squareCheck, bombs){
    squareCheck.addEventListener("click", function(){
        if(!this.classList.contains("safe") && !bombsCheck){
            if(bombs.includes(parseInt(this.innerText))){
                this.classList.add("death")
                bombsCheck = true
                loserMatch(n)
                showBoms(bombs)
            } else {
                this.classList.add("safe")
                bombsCheck = false
                n++
            }
        }
        
        result.innerHTML = n;
        
        let vittoria = numSquares - numBombs -1;
        if(n === vittoria){
            winMatch(vittoria)
        } 
    })
}

// Funzione Show bobms -
function showBoms(bombs){
    const squares = document.querySelectorAll(".square")
    for(let square of squares){
        if(bombs.includes(parseInt(square.innerText))){
            square.classList.add("death")
        }
    }
}





 // Funzione perdida / vittoria partita -
function loserMatch(n){
    PopUpRes.classList.add("pop-up-active");
    iconCheck.classList.add("d-none")
    PopUpH3.innerHTML = "Hai perso!"
    PopUpUl.innerHTML = `Caselle corrette: ${n}`;   
}
function winMatch(vittoriaN){
    PopUpRes.classList.add("pop-up-active");
    iconNoCheck.classList.add("d-none")
    PopUpH3.innerHTML = "Hai vinto!"
    PopUpUl.innerHTML = `Caselle corrette: ${vittoriaN}`; 
}

//funzione per generare n bombe
function generateBombs(numBomb , numSquares){
    const bombs = [];
    while(bombs.length <= numBomb){
        const bombRandom = getRandomInt(1, numSquares)
        if(bombs.indexOf(bombRandom) < 0){
            bombs.push(bombRandom)
        } 
    }
    return bombs
}
//funzione per generare n Square con Math.sqrt
function createSquare(squareSqrt, index){
    let square = document.createElement("div")
    square.classList.add("square");
    square.style.width = `calc(100% / ${squareSqrt})`
    square.style.height = square.style.width;
    square.innerText = `${index}`
    squareGrid.appendChild(square)
    return square;
}
 



function restartFlow(){
    PopUpRes.classList.add("d-none")   
     
}

                  

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
