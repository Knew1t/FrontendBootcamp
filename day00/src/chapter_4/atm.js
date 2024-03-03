// Напишите функцию банкомат которая принимает на вход число и возвращает объект в формате: {номинал_купюры : количество_купюр}.
// Если банкомат не может выдать данную сумму, то выводится ошибка 'Incorrect value'.
// Купюры должны выдаться оптимальным образом (вместо 5 купюр номиналом 1000 выдается одна 5000).
// За раз банкомат может выдавать не более 20 купюр, если купюр для выдачи не хватает то выводится ошибка 'Limit exceeded'

function atm(sum) {
  const banknotes = [5000, 2000, 1000, 500, 200, 100, 50];
  const resultObject = {};
  let banknotesAmount = 20;
  if (sum <= 0 || sum === undefined || sum % 50 != 0) {
    console.log("Incorrect value");
    return;
  } else {
    for (let element of banknotes) {
      while (sum >= element) {
        if (element in resultObject) {
          ++resultObject[element];
        } else {
          resultObject[element] = 1;
        }
        sum -= element;
        --banknotesAmount;
      }
      if (banknotesAmount < 0) {
        console.log("Limit exceeded");
        return;
      }
    }
  }
  let json = JSON.stringify(resultObject);
  let result = json.replace(/":/g, " : ").replace(/"/g, " ");
  console.log(result);
  return resultObject;
}

atm(-8350); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
atm(8350); // {5000 : 1, 2000 : 1, 1000 : 1, 200 : 1, 100 : 1, 50 : 1 }
atm(2570); // Incorrect value
atm(100050); // Limit exceeded
atm(100);
atm(50050);
