let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function foo_1() { makeMove(0); }
function foo_2() { makeMove(1); }
function foo_3() { makeMove(2); }
function foo_4() { makeMove(3); }
function foo_5() { makeMove(4); }
function foo_6() { makeMove(5); }
function foo_7() { makeMove(6); }
function foo_8() { makeMove(7); }
function foo_9() { makeMove(8); }

function makeMove(index) {
   if (board[index] !== '') {
       return;
   }

   board[index] = currentPlayer;
   document.getElementById('id_' + (index + 1)).innerText = currentPlayer;

   if (checkWin(currentPlayer)) {
       document.getElementById('rezult').innerText = currentPlayer + ' wins!';
       return;
   }

   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
   let winCombinations = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
   ];

   return winCombinations.some(combination => {
       return combination.every(index => board[index] === player);
   });
}

// Начать заново
document.getElementById('restart').addEventListener('click', function() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
 
    for (let i = 1; i <= 9; i++) {
        document.getElementById('id_' + i).innerText = '';
    }
 
    document.getElementById('rezult').innerText = '';
 });
 