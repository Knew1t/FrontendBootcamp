const buttonWaiterSelect = document.getElementById("waiterDropdownSelect");
const buttonItemSelect = document.getElementById("menuDropdownSelect");
const menuItemList = document.querySelectorAll("label");
const menuInput = document.getElementById("menuDropdownSelect");
const userInput = document.getElementById("waiterDropdownSelect");
const userList = document.querySelectorAll("li");
const buttonSubmit = document.getElementById("submitButton");
const buttonCancel = document.getElementById("cancelButton");
const currentAddress = window.location.href;

const isWaiter = buttonWaiterSelect.getAttribute('data-isWaiter');
console.log("loggedUserRole: ", isWaiter);

const selectedMenuItems = new Map();
const selectedMenuIDs = new Map();

const remove = [];
let selectedUser = -1;
if (isWaiter) {
    selectedUser = buttonWaiterSelect.getAttribute('data-userId');
}

console.log("selectedUser: ", selectedUser);

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return await response.json();
}

buttonCancel.addEventListener("click", (ev) => {
    document.location.reload();
});

buttonSubmit.addEventListener("click", () => {
    console.log("submit button clicked");
    console.log(selectedUser);
    console.log(selectedMenuIDs.size);
    if (selectedUser >= 0 && selectedMenuIDs.size > 0) {
        postData(currentAddress, {
            UserId: selectedUser,
            MenuItems: Array.from(selectedMenuIDs.keys()),
            Amount: Array.from(selectedMenuIDs.values()),
        }).then((data) => {
            document.location.href = `${currentAddress}/${data.id}`;
        });
    } else {
        alert("Incorrect order details");
    }
});

buttonWaiterSelect.addEventListener("click", (ev) => {
    if (!isWaiter) {
        document.getElementById("waitersList").classList.toggle("show");
    }
});

//remove Items from selector
buttonItemSelect.addEventListener("click", (ev) => {
    if (ev.target.getAttribute("class") == "pressToRemove") {
        let text = ev.target.textContent;
        let value = selectedMenuItems.get(text);
        if (value > 1) {
            selectedMenuItems.set(text, value - 1);
        } else {
            selectedMenuItems.delete(text);
        }
        menuInput.innerHTML = selectedMenuItems.size == 0
            ? "Choose menu item"
            : Array.from(selectedMenuItems, ([name, value]) => {
                return `<div class="pressToRemove">${name}</div><div class="count"> ${value}</div>`;
            });
        ev.stopPropagation();
    } else {
        document.getElementById("itemsList").classList.toggle("show");
    }
});

// add items to selector
menuItemList.forEach((element) => {
    element.addEventListener("click", (ev) => {
        let text = element.textContent;
        let menuId = element.getAttribute("data-id");
        if (selectedMenuItems.has(text)) {
            selectedMenuItems.set(text, selectedMenuItems.get(text) + 1);
            selectedMenuIDs.set(
                menuId,
                selectedMenuIDs.get(menuId) + 1,
            );
        } else {
            selectedMenuItems.set(text, 1);
            selectedMenuIDs.set(element.getAttribute("data-id"), 1);
        }
        menuInput.innerHTML = selectedMenuItems.size == 0
            ? "Choose menu item"
            : Array.from(selectedMenuItems, ([name, value]) => {
                return `<div class="pressToRemove">${name}</div><div class="count"> ${value}</div>`;
            });
    });
});
// let checker = check(0); // CLOSURE MOTHERFFFF
userList.forEach((element) => {
    element.addEventListener("click", (ev) => {
        let text = element.textContent;
        userInput.textContent = text;
        selectedUser = Number(element.getAttribute("data-id"));
    });
});
