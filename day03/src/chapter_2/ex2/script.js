// alert("hello");
window.onload = function () {
  let buttons = Array.from(document.getElementsByTagName("button"));
  let resultOutput = document.getElementById("result");
  buttons.forEach((element) => {
    element.addEventListener("click", () => {
      if (element.textContent == "=") {
        resultOutput.value = eval(resultOutput.value);
      } else if (element.textContent == "C") {
        resultOutput.value = "";
      } else {
        resultOutput.value += element.textContent;
      }
    });
  });
};
