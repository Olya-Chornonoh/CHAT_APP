let username;

function getUsers() {
  var requestOptions = {
    method: 'GET'
  };

  fetch("https://studentschat.herokuapp.com/users", requestOptions)
    .then(response => response.json())
    .then(result => {
      const users = document.getElementById("users");
      users.innerHTML = "";
      result.forEach(item => {
        const user = document.createElement("div");
        user.setAttribute('data-username', item.username);
        user.setAttribute('data-userid', item.user_id);
        user.classList.add('user', item.status);

        user.innerText = item.username;

        user.addEventListener('click', () => {
          username = item.username;
        });

        users.appendChild(user);
      });
    });
}

function sendMessage(text) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "datetime": new Date().toISOString(),
    "username": username,
    "message": text
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://studentschat.herokuapp.com/messages", requestOptions)
    .then(response => response.json());
}

window.addEventListener('load', () => {
  getUsers();

  const text_message = document.getElementById("text_message");
  const send_message = document.getElementById("send_message");
  send_message.addEventListener('click', () => {
    let text = text_message.value;
    sendMessage(text).then(() => {
      text_message.value = "";
    })
  });
});
