const button = document.getElementById("button");
const container = document.getElementById("container");
const currentAdress = window.location.href;

button.addEventListener("click", () => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let num = document.getElementById("input").value;
    fetch(`${currentAdress}${num}`).then((response) => {
        return response.json();
    }).then((data) => {
        for (i of data) {
            console.log(i);
            let newDiv = document.createElement("div");
            let textContent = document.createTextNode(i.OrderId);
            newDiv.appendChild(textContent);
            container.appendChild(newDiv);
        }
    });
});

