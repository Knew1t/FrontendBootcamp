// Вам нужно написать функцию которая принимает в качестве аргумента массив чисел и удаляет все повторяющиеся значения.

function removeReps(array) {
  for (let i = 0; i < array.length; ++i) {
    let tmp = array[i];
    for (let j = i + 1; j < array.length; ++j) {
      if (tmp === array[j]) {
        array.splice(j, 1);
        j -= 1;
      }
    }
  }
  console.log(array);
}

removeReps([1, 1, 2, 4, 5, 6, 6, 8, 9, 11]); // [1,2,4,5,6,8,9,11]

removeReps([1, 1, 1, 1]); // [1]

removeReps([1, 2, 3, 4, 5, 6]); // [1,2,4,5,6]
