// Вам надо набор функций который будет симулировать работу калькулятора.
// Для этого вам надо написать 9 функций, которые могут принимать в качестве аргумента другую функцию, если функция передана, то надо вернуть вызов функции с числом n, иначе вернуть число n.
// Например, функция one может принять в качестве аргумента функцию sum, тогда в return будет sum(1).Если же в функцию не передали ничего, то она просто вернет 1.
// Также надо написать 4 функции основных арифмитических операторов, которые принимают в качестве аргумента первое число, а возвращают функцию, которая принимает в качестве аргумента второе число и возвращает их сумму/разность/частое/произведение.

function one(callback) {
  if (callback === undefined) {
    return 1;
  } else {
    try {
      return callback(1);
    } catch (error) {
      return 1;
    }
  }
}

function two(callback) {
  if (callback === undefined) {
    return 2;
  } else {
    try {
      return callback(2);
    } catch (error) {
      return 2;
    }
  }
}

function three(callback) {
  if (callback === undefined) {
    return 3;
  } else {
    try {
      return callback(3);
    } catch (error) {
      return 3;
    }
  }
}
function four(callback) {
  if (callback === undefined) {
    return 4;
  } else {
    try {
      return callback(4);
    } catch (error) {
      return 4;
    }
  }
}

function five(callback) {
  if (callback === undefined) {
    return 5;
  } else {
    try {
      return callback(5);
    } catch (error) {
      return 5;
    }
  }
}

function six(callback) {
  if (callback === undefined) {
    return 6;
  } else {
    try {
      return callback(6);
    } catch (error) {
      return 6;
    }
  }
}

function seven(callback) {
  if (callback === undefined) {
    return 7;
  } else {
    try {
      return callback(7);
    } catch (error) {
      return 7;
    }
  }
}

function eight(callback) {
  if (callback === undefined) {
    return 8;
  } else {
    try {
      return callback(8);
    } catch (error) {
      return 8;
    }
  }
}

function nine(callback) {
  if (callback === undefined) {
    return 9;
  } else {
    try {
      return callback(9);
    } catch (error) {
      return 9;
    }
  }
}

function plus(a) {
  return (n) => n + a;
}

function minus(a) {
  return (n) => n - a;
}

function divide(a) {
  return (n) => n / a;
}

function mult(a) {
  return (n) => n * a;
}

console.log(one(plus(two())));
console.log(one(minus(two())));
console.log(one(mult(three(plus(four()))))); // В итоге вернется 7
console.log(four());
console.log(five(mult(three())));

