//  В этой задаче нужно будет написать алгоритм поиска, который скажет, можно ли найти входное слово в головоломке поиска слов, которая тоже подается функции на вход.
// Данная задача имеет два уровня сложности :
// - Первый уровень включает в себя исключительно поиск по вертикали и по горизонтали
// - Второй уровень дополнительно включает в себя поиск по диагонали
// - Слова могут быть записаны слева направо и наоборот.

function checkRight(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (j < puzzle[0].length && word[wordId] === puzzle[i][j]) {
    return checkRight(puzzle, i, j + 1, word, ++wordId);
  } else {
    return false;
  }
}

function checkLeft(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (j >= 0 && word[wordId] === puzzle[i][j]) {
    return checkLeft(puzzle, i, j - 1, word, ++wordId);
  } else {
    return false;
  }
}

function checkUp(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i >= 0 && word[wordId] === puzzle[i][j]) {
    return checkUp(puzzle, i-1, j, word, ++wordId);
  } else {
    return false;
  }
}
function checkUpLeft(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i >= 0 && j >=0 && word[wordId] === puzzle[i][j]) {
    return checkUpLeft(puzzle, i-1, j-1, word, ++wordId);
  } else {
    return false;
  }
}

function checkUpRight(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i >= 0 && j < puzzle[0].length && word[wordId] === puzzle[i][j]) {
    return checkUpRight(puzzle, i-1, j+1, word, ++wordId);
  } else {
    return false;
  }
}

function checkDown(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i < puzzle.length && word[wordId] === puzzle[i][j]) {
    return checkDown(puzzle, i+1, j, word, ++wordId);
  } else {
    return false;
  }
}

function checkDownLeft(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i < puzzle.length && j >= 0 && word[wordId] === puzzle[i][j]) {
    return checkDownLeft(puzzle, i+1, j-1, word, ++wordId);
  } else {
    return false;
  }
}

function checkDownRight(puzzle, i, j, word, wordId) {
  if (wordId === word.length) {
    return true;
  }
  if (i < puzzle.length && j < puzzle[0].length && word[wordId] === puzzle[i][j]) {
    return checkDownRight(puzzle, i+1, j+1, word, ++wordId);
  } else {
    return false;
  }
}


function searchSubString(puzzle, word ) {
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === word[0]) {
        if (
          checkRight(puzzle, i, j + 1, word, 1) ||
          checkLeft(puzzle, i, j - 1, word, 1) ||
          checkUp(puzzle, i - 1, j, word, 1) ||
          checkDown(puzzle, i + 1, j, word, 1)||
          checkUpRight(puzzle, i-1, j+1, word, 1) ||
          checkUpLeft(puzzle, i-1, j-1, word, 1) ||
          checkDownRight(puzzle, i+1, j+1, word, 1) ||
          checkDownLeft(puzzle, i+1, j-1, word, 1) 
        ) {
          console.log(true);
          return true;
        }
      }
    }
  }
  console.log(false);
  return false;
}

const examplePuzzle = [
  ["b", "l", "g", "o", "l", "d", "s"],
  ["x", "k", "q", "w", "i", "j", "p"],
  ["a", "n", "w", "k", "k", "p", "n"],
  ["h", "e", "e", "e", "k", "i", "l"],
  ["q", "e", "k", "a", "y", "q", "a"],
  ["h", "u", "h", "a", "e", "a", "u"],
  ["k", "q", "j", "c", "c", "m", "r"],
];

// Level 1
console.log("level 1")
searchSubString(examplePuzzle, "lgo"); // true
searchSubString(examplePuzzle, "like"); // true
searchSubString(examplePuzzle, "gold"); // true
searchSubString(examplePuzzle, "queen"); // true

// Level 2
console.log("level 2")
searchSubString(examplePuzzle, "cake"); // true
searchSubString(examplePuzzle, "uk"); // true
searchSubString(examplePuzzle, "meaenx"); // true
searchSubString(examplePuzzle, "ekj"); // true
searchSubString(examplePuzzle, "js"); // true
searchSubString(examplePuzzle, "kukek"); // true
searchSubString(examplePuzzle, "kneel"); // true

