const username = localStorage.getItem('username');

function getUsers() {
  const requestOptions = {
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

        user.innerHTML = item.username;

        users.appendChild(user);
      });
    });
}

function sendMessage(text) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "datetime": new Date().toISOString(),
    "username": username,
    "message": text
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://studentschat.herokuapp.com/messages", requestOptions)
    .then(response => response.json());
}

function getMessages(){
  const requestOptions = {
    method: 'GET'
  };
  fetch("https://studentschat.herokuapp.com/messages", requestOptions)
  .then(response => response.json())
  .then(result => {
    const messages = document.getElementById("text_messages");
    messages.innerHTML = "";
    result.forEach(item => {
      const message = document.createElement("div");
      message.classList.add("get_message");
      message.innerHTML = `
        <p>${item.username}</p>
        <p>${item.datetime}</p>
        <p class="description">${item.message}</p>
      `;
      messages.appendChild(message);
    })
    messages.scrollTo(0,messages.scrollHeight);
  });
}

function signOut(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": username
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch("https://studentschat.herokuapp.com/users/logout", requestOptions)
  .then(response => response.json())
  .then(result => {
    localStorage.removeItem(username);
    window.location = '/';
  });
}

window.addEventListener('load', () => {
  getUsers();
  getMessages();

  const text_message = document.getElementById("text_message");
  const send_message = document.getElementById("send_message");
  const sign_out = document.getElementById("sign_out");

  send_message.addEventListener('click', () => {
    const text = text_message.value;
    sendMessage(text).then(() => {
      text_message.value = "";
      getMessages();
    })
  });

  sign_out.addEventListener('click', () => {
    signOut();
  })
});
