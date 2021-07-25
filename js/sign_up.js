function register(data) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify(data);

  const requestOptions = {
    method: 'POST',
    headers,
    body
  };

  return fetch("https://studentschat.herokuapp.com/users/register", requestOptions)
    .then(response => response.json());
}

function handleFormSubmit(event) {
  event.preventDefault();

  let formData = new FormData(document.forms.person);

  let data = { username: formData.get('username'), password: formData.get('password') };

  register(data)
    .then((result) => {
      if (result.id) {
        console.log(result);
        window.location = '/chat.html';
      }

      const errorBlock = document.getElementById('error');

      errorBlock.innerText = result.message;
    })
    .catch((error) => {
      const errorBlock = document.getElementById('error');

      errorBlock.innerText = error.message;
    });
}

window.addEventListener('load', () => {
  const person = document.getElementById('person');

  person.addEventListener('submit', handleFormSubmit);
});
