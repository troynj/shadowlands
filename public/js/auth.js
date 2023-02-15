const form = document.getElementById('signup-form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  // Check username input
  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank');
  } else if (!/^[a-zA-Z0-9]+$/.test(usernameValue)) {
    setErrorFor(username, 'Username can only contain letters and numbers');
  } else {
    setSuccessFor(username);
  }

  // Check email input
  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(emailValue)) {
    setErrorFor(email, 'Email is not valid');
  } else {
    setSuccessFor(email);
  }

  // Check password input
  if (passwordValue === '') {
    setErrorFor(password, 'Password cannot be blank');
  } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(passwordValue)) {
    setErrorFor(password, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  } else {
    setSuccessFor(password);
  }

  // Check confirm password input
  if (confirmPasswordValue === '') {
    setErrorFor(confirmPassword, 'Confirm password cannot be blank');
  } else if (passwordValue !== confirmPasswordValue) {
    setErrorFor(confirmPassword, 'Passwords do not match');
  } else {
    setSuccessFor(confirmPassword);
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
  if (input.hasAttribute('required') && input.classList.contains('selected')) {
    input.style.outlineColor = 'yellow';
  }
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  if (input.classList.contains('selected')) {
    input.style.outlineColor = 'green';
  }
}

// Select form inputs on click
const formInputs = document.querySelectorAll('.form-control input');

formInputs.forEach(input => {
  input.addEventListener('click', (e) => {
    input.classList.add('selected');
  });
});

// Deselect form inputs on focus out
form.addEventListener('focusout', (e) => {
  if (!e.target.classList.contains('form-control')) {
    return;
  }

  e.target.classList.remove('selected');
});
