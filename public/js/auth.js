const signinBtn = document.querySelector("#signin-btn");
const signupBtn = document.querySelector("#signup-btn");
const signinForm = document.querySelector("#signin-form");
const signupForm = document.querySelector("#signup-form");
const [siBtn, suBtn] = document.querySelectorAll('button[type="submit"]')

signinBtn.addEventListener("click", function () {
  signinForm.classList.add("show");
  signinForm.classList.add("active");
  signupForm.classList.remove("show");
  signupForm.classList.remove("active");
});

signupBtn.addEventListener("click", function () {
  signupForm.classList.add("show");
  signupForm.classList.add("active");
  signinForm.classList.remove("show");
  signinForm.classList.remove("active");
});

siBtn.addEventListener('submit', async function(event) {
  event.preventDefault()
  const username = document.querySelector('input type="name"')
  const password = document.querySelector('input type="password"')
  const cpassword = document.querySelector('input type="confirm-password"')

  if (password !== cpassword)return

  const response = User.create({username, password})

    if (response.ok) {
      const data = await response.json();
      console.log('User created successfully:', data);
    } else {
      console.error('Error creating user:', response.statusText);
    }
}
)

siBtn.addEventListener('submit', async function(event) {
  event.preventDefault()
  const username = document.querySelector('input type="name"')
  const password = document.querySelector('input type="password"')


User.create({username, password})


    if (response.ok) {
      const data = await response.json();
      console.log('User created successfully:', data);
    } else {
      console.error('Error creating user:', response.statusText);
    }
})