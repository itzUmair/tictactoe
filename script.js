const boxes = document.querySelectorAll('.box');

const userChar = `<img class="user" src="assets/X.png">`
const aiChar = `<img class="ai" src="assets/O.png">`

let availableMoves = []
let userTurn = false

let winScenarios = [
    // all rows
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],

    // all columns
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    
    // all diagonals
    [[0,0], [1,1], [2,2]],
    [[2,0], [1,1], [0,2]]
]

let board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
]

function user() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            boxes[((row*3)+col)].addEventListener('click', () => {
                boxes[((row*3)+col)].innerHTML = userChar
                userTurn = false
                updateBoard([row, col], 'X')
            })
        }
    }
    
}

function ai() {
    getAvailableMoves()
    if (availableMoves.length) {
        let choice = Math.floor(Math.random() * availableMoves.length)
        let row = availableMoves[choice][0]
        let col = availableMoves[choice][1]
        boxes[((row*3)+col)].innerHTML = aiChar
        userTurn = true
        updateBoard(availableMoves[choice], 'O')
    }
}

function getAvailableMoves() {
    availableMoves = []
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++){
            if (board[row][col] === '_') {
                availableMoves.push([row, col])
            }
        }
    }
}

function updateBoard(box, player) {
    board[box[0]][box[1]] = player
    // console.log(board)
}

// work on game check function
// function gameCheck() {
//     for (let i = 0; i < 8; i++){
//         for (let j of winScenarios[i]) {
//             if (board[j] === board[j+1] && board[j+1] === board[j+2]){
//                 console.log(board[j])
//             }
//             else {
//                 return false
//             }
//         }
//     }
// }

// gameCheck()
// setInterval(() => {
//     if (!gameCheck) {
//         userTurn ? user() : ai()}},
//          1000)

function decideTurn() {
    let turn = Math.round(Math.random())
    turn ? userTurn = true : userTurn = false
    console.log(turn)
}

decideTurn()

setInterval(() => {
    userTurn ? user() : ai()},
        1000)
