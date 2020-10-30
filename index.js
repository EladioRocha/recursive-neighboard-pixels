const WIDTH = 10,
  BOARD_SIZE = 10000
  SQUARES = [], // Aquí guardamos todos los divs de cada uno de los SQUARES
  BOMB_AMOUNT = 6000

let PIXELS = []
let PIXELARTARR = Array(BOARD_SIZE).fill(0)

const gameContainer = document.querySelector('.game-container')

let gameActive = true,
  flags = 0

/**
 * Coordenada en donde hay un valor 1
 * {
 *    coordenada: k
 * }
 */
let bombsChecked = {}

async function createBoard() {
  // Generamos bombas de forma aleatoria
  const bombsArr = Array(BOMB_AMOUNT).fill(1) // Crea un array de bombas
  const noBombsArr = Array(BOARD_SIZE - BOMB_AMOUNT).fill(0) // Crea un array de no bombas
  const gameArr = [...noBombsArr, ...bombsArr].sort(() => Math.random() - 0.50) // Une los dos arreglos y distribuye aleatoriamente las bombas
  // JSON.parse(localStorage.getItem('pix'))
  gameArr[12] = 1
  gameArr[23] = 1

  PIXELS = gameArr
  

  let copyPixels = [...PIXELS]

  reshape(copyPixels, 10, 10)

  console.log(copyPixels)
  console.log(PIXELS)

  for(let i = 0; i < BOARD_SIZE; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    square.innerText = (gameArr[i]) ? '1': '0'
    square.className = (gameArr[i]) ? 'txt-red bomb': ''
    gameContainer.appendChild(square) 
    SQUARES.push(square)
    square.addEventListener('click', handleCellClick)
  }

  await iterateBoard()
  console.log("TOTAL OBJECTS", totalObjects)

}

createBoard()

var secondss = 0
var searchingNeigboards = false
var inRecursive = false
var columnCount = 0
var globalIdx = 0

async function iterateBoard() {
  const SQUARES = document.querySelectorAll('.game-container > div')
  let lastIndex = 1
  for(let i = 0; i < BOARD_SIZE; i++) {
    globalIdx = i
    await delay(100)
    if(searchingNeigboards) {
      i--
      continue
    }
    if(lastIndex !== null) {
      SQUARES[lastIndex].style.background = 'red'
      SQUARES[lastIndex].classList.remove('checked')
    }
    SQUARES[i].classList.add('checked')
    handleCurrentPixel(SQUARES[i], i, true)
    if(functionsStack.length === 0) {
      searchingNeigboards = false
    }
    lastIndex = i
    // if(i >= 8) return
  }
}

let totalObjects = 0

function handleCurrentPixel(squareDOM, idx, newObject = false) {
  if(idx in bombsChecked) {
    console.log('aqui meroe')
    // functionsStack.pop()
    // if(functionsStack.length === 0) {
      // searchingNeigboards = false
    // }
    return
  }
  if(!(idx in bombsChecked) && PIXELS[idx] !== 1 && newObject) return
  if(PIXELS[idx] === 1) {
    if(!newObject) {
      functionsStack.push(true)
    }
    totalObjects += (newObject) ? 1 : 0
    searchingNeigboards = true
    // secondss = 100000
    checkNeighbordSQUARES(idx)
    squareDOM.classList.add('checked-forever')
    bombsChecked[idx] = PIXELS[idx]
    // setTimeout(() => {
    //   searchingNeigboards = false
    //   }, 1000000)
  }
  console.log('FUNCTIONS STACK:::: HANDLE CURRENT', functionsStack)
  // functionsStack.pop()
  console.log('FUNCTIONS STACK:::: HANDLE CURRENT', functionsStack)
  if(functionsStack.length === 0) {
    searchingNeigboards = false
  }
  // searchingNeigboards = false
}

let functionsStack = []

function checkNeighbordSQUARES(idx) {
  const isInLeftSide = (idx % WIDTH) === 0 // Esto nos ayuda a ver si esta en el principio del lado izquierdo. Por ejemplo: 0, 10, 20 etc.
  const isInRightSide = (idx % WIDTH) === (WIDTH - 1) // Esta constante nos ayuda a ver si esta al final del lado derecho, ejemplo: 9, 19, 29 etc

  console.log(isInLeftSide, columnCount)
  console.log(isInRightSide)
  console.log('===========================================================')
  setTimeout(() => {
    if(idx > 0 && !isInLeftSide) {
      const newId = SQUARES[parseInt(idx) - 1].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) - 1)
    }
    if(idx > (WIDTH - 1) && !isInRightSide) {
      const newId = SQUARES[parseInt(idx) + 1 - WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) + 1 - WIDTH)
    }
    if(idx > WIDTH) {
      const newId = SQUARES[parseInt(idx) - WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) - WIDTH)
    }
    if(idx > (WIDTH + 1) && !isInLeftSide) {
      const newId = SQUARES[parseInt(idx) - 1 - WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) - 1 - WIDTH)    
    }
    if(idx < (BOARD_SIZE - 2) && !isInRightSide) {
      const newId = SQUARES[parseInt(idx) + 1].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) + 1)
    }
    if(idx < (BOARD_SIZE - 10) && !isInLeftSide) {
      const newId = SQUARES[parseInt(idx) - 1 + WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) - 1 + WIDTH)
    }
    if(idx < (BOARD_SIZE - 12) && !isInRightSide) {
      const newId = SQUARES[parseInt(idx) + 1 + WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) + 1 + WIDTH)
    }
    if(idx < (BOARD_SIZE - 11)) {
      const newId = SQUARES[parseInt(idx) + WIDTH].id
      newSquare = document.getElementById(newId)
      console.log(newId)
      handleCurrentPixel(newSquare, parseInt(idx) + WIDTH)
    }

    functionsStack.pop()
  }, 100)
}

// IRRELEVANT ===========================================

document.addEventListener('keyup', selectColor)

let currentColor = ''
function selectColor(e) {
  if(e.key === '1') {
    currentColor = '#057D04'
  }
  if(e.key === '2') {
    currentColor = '#97C839'
  }
  if(e.key === '3') {
    currentColor = '#EC1C2B'
  }
  if(e.key === '4') {
    currentColor = '#201E19'
  }
}

function handleCellClick(e) {
  PIXELARTARR[parseInt(e.target.id)] = 1
  e.target.style.background = currentColor
}

function delay(seconds) {
  return new Promise(resolve => setTimeout(() => resolve(true), seconds));
}

function reshape(arr, rows, cols) {
  var copy = arr.slice(0); // Copy all elements.
  arr.length = 0; // Clear out existing array.

  for (var r = 0; r < rows; r++) {
    var row = [];
    for (var c = 0; c < cols; c++) {
      var i = r * cols + c;
      if (i < copy.length) {
        row.push(copy[i]);
      }
    }
    arr.push(row);
  }
};
