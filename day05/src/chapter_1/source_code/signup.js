const buttonSignUp = document.getElementById('signUpButton');
const radioContainer = document.getElementById('radioInputs');
const signInReference = document.getElementById('signInButton')
const hostLocation = window.location.host;
const currentLocation = `http://${hostLocation}/signup`;

// setting href to link based on our current port etc.
signInReference.href = `http://${hostLocation}/signin`;

function getPassword() {
    const password = document.getElementById('password').value;
    const repeatedPassword = document.getElementById('repeatPassword').value;
    if (password === repeatedPassword) {
        return password;
    } else {
        return undefined;
    }
}

function getRole() {
    const radioElements = radioContainer.getElementsByClassName('radio');
    for (let i = 0; i < radioElements.length; i++) {
        if (radioElements[i].checked) {
            return radioElements[i].value;
        }
    }
}

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
    return await response.text(); // parses JSON response into native JavaScript objects
}

buttonSignUp.addEventListener('click', () => {
    const pass = getPassword();
    if (!pass) {
        alert("bad password");
        return;
    }
    const role = getRole();
    const login = document.getElementById('login').value;
    console.log(pass, role, login);
    postData(currentLocation, {
        name: login,
        "role": role,
        password: pass,
    }).then(() => {
        document.location.href = `http://${hostLocation}/orders`;
    });
});


