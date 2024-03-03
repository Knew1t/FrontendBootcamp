// Напишите функицю, которая принимает индекс числа из ряда Фибоначчи и возвращает его значение.
// Предположим, что ряд Фибоначчи начинается с 0 индекса.
/* closure*/
// function fibo(index) {
//   let answer = 0;
//   let next = () => {
//     let a = 0, b = 1;
//     next = () => {
//       let oldB = b;
//       b = a + b;
//       a = oldB;
//       return b;
//     };
//     return a;
//   };
//   while (index >= 0) {
//     answer = next();
//     --index;
//   }
//   console.log(answer);
// }

/* recursion */

function fibo(index) {
  if (index < 0 || index === undefined){
    return undefined;
  }
  let a = 1;
  let b = 1;
  if (index <= 1) {
    return 1;
  } else {
    return fibo(index - 1) + fibo(index - 2);
  }
}

console.log(fibo(5)); // Вернет 8h
console.log(fibo(0));
console.log(fibo(1));
console.log(fibo(8));
console.log(fibo(21));
console.log(fibo(-21));
console.log(fibo());
