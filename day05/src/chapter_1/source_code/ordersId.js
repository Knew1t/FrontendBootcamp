const closeOrderButton = document.getElementById("closeOrderButton");

closeOrderButton.addEventListener("click", (ev) => {
  console.log(window.location.href);
  let data = {
    id: Number(closeOrderButton.getAttribute("data-id")),
    isActive: true,
  };
  console.log(data);
  fetch(window.location.href, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
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
});
