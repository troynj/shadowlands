// document.querySelector("button[type='submit']").addEventListener('submit', submitCredentials)
document.getElementById("submit").addEventListener('click', submitCredentials)

async function submitCredentials(event) {
  event.preventDefault();

  console.log(event.target)
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("username", email);
  console.log("password", password);

  await Auth.SignIn(email, password);
  document.location.replace('/');
};
