// Функция на вход принимает две строки - сообщение (обычная строка с текстом) и символ который надо удалить из этого сообщения.

//#1 вариант
// function removeString(message, symbol) {
//   while (message.split("").includes(symbol)) {
//     message = message.replace(symbol, "");
//   }
//   console.log(message);
// }

function removeString(message, symbol) {
  message = message.split("").filter((element) => element != symbol).join("");
  console.log(message);
}

removeString("Большое и интересное сообщение", "о"); // Бльше и интересне сбщение
removeString("Hello world!", "z"); // Hello world!
removeString("А роза азора", "А"); // роза азора
removeString("aaaaaaaaa", "a"); 
