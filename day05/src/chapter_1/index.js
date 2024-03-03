const button = document.getElementById("button");

button.addEventListener("click", () => {
  let num = document.getElementById("input").value;
  location.href = `http://localhost:3000/orders/${num}`;
});
