const signInButton = document.getElementById('signInButton');
const signUpReference = document.getElementById("signUpReference");
const loginField = document.getElementById('loginField');
const passwordField = document.getElementById('password');
const currentAddress = window.location.href;

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.ok;
}

function getPassword() {
    return passwordField.value;
}

signUpReference.href = window.location.protocol + "//" + window.location.host + "/signup";

signInButton.addEventListener('click', () => {
    const password = getPassword();
    const login = loginField.value;
    console.log("LOGIN: ", login, "\nPASSWORD: ", password);
    console.log("CURRENT ADDRESS: ", currentAddress);
    let response = postData(currentAddress, { "password": password, "name": login });
    if (response) {
        console.log(window.location.protocol + window.location.host + "/orders");
        window.location.href = window.location.protocol + "//" + window.location.host + "/orders";
    } else {
        alert("something wrong");
    }
});

//клиент: отправляем запрос с логином и паролем
//server: проверяем наличие нужного логина и пароля в сессиях???
