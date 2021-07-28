function login(data) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");

  let body = JSON.stringify(data);

  let requestOptions = {
    method: 'POST',
    headers,
    body
  };

  return fetch("https://studentschat.herokuapp.com/users/login", requestOptions)
    .then(response => response.json());

}

function handleFormSubmit(event) {
  event.preventDefault();

  let formData = new FormData(document.forms.person);

  let data = { username: formData.get('username'), password: formData.get('password') };

  login(data)
    .then((result) => {
      if (Array.isArray(result)) {
        console.log(result);
        localStorage.setItem('username', formData.get('username'));
        window.location = '/chat.html';
      } else{
      const errorBlock = document.getElementById('error');

      errorBlock.innerText = error.message;
      }})
    .catch((error) => {
      const errorBlock = document.getElementById('error');

      errorBlock.innerText = error.message;
    });
}

window.addEventListener('load', () => {
  const person = document.getElementById('person');

  person.addEventListener('submit', handleFormSubmit);
});
