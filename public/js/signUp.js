// document.querySelector("button[type='submit']").addEventListener('submit', submitCredentials)
document.getElementById("submit").addEventListener('click', submitCredentials)

async function submitCredentials(event) {
  event.preventDefault();
  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm").value.trim();

  console.log("username", name);
  console.log("password", password);
  console.log("confirm", confirm);

  if (name && email && password && password === confirm) {
const userID = await Auth.SignUp({name, email, password});

document.location.replace(`/Dashboard/${userID}`);
  
  
  }
};
