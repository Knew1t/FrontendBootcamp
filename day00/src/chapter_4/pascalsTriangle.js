// Напишите функцию, которая будет принимать координаты числа в треугольника Паскаля и будет возвращать значение по координатам.
// Если вы не знаете, что такое треугольник Паскаля, советую прочитать перед выполнение задания.
// https://cdn.fishki.net/upload/post/201502/04/1414683/947eb978f710426fd0702fd119da506b.gif тут можно посмотреть наглядно принцип работы.
// Предположим, что начальные координаты 0,0.
// Тут, возможно, поможет рекурсия.

function paskalsTriangle(x, y) {
  if (y < Math.pow(2, x)) {
    let fact = (n) => n > 1 ? fact(n - 1) * n : 1;
    let yFactorial = fact(y);
    let xFactorial = fact(x);
    return xFactorial / (yFactorial * (fact(x - y)));
  } else {
    throw new Error("Wrong coordinats!");
  }
}

// console.log(fact(5));
console.log(paskalsTriangle(3, 2)); // 3
console.log(paskalsTriangle(5, 4)); // 5
console.log(paskalsTriangle(1, 1)); // 1
console.log(paskalsTriangle(0, 0)); // 1
console.log(paskalsTriangle(0, 2)); // err
console.log(paskalsTriangle(-1, 2)); //err
