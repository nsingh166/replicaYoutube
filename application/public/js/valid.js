let isUsernameValid = false;
let isEmailValid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;

//Username Validation
document.getElementById('username').addEventListener('input', function (ev) {
  let userInput = ev.currentTarget;
  let username = userInput.value;

  if (username.length >= 3 && /^[a-zA-Z]/.test(username)) {
    userInput.classList.add('class', 'valid-text');
    userInput.classList.remove('class', 'invalid-text');
    isUsernameValid = true;
  } else {
    userInput.classList.remove('class', 'valid-text');
    userInput.classList.add('class', 'invalid-text');
    isUsernameValid = false;
  }
});

const usernameInput = document.getElementById('username');
const rulesSpan = document.getElementById('rules');

usernameInput.addEventListener('focus', () => {
  rulesSpan.innerHTML = `
      <ul class = "Rules">
        <li>Enter a username that begins with a character.</li>
        <li>Username must be at least 3 alphanumeric characters.</li>
      </ul>
    `;
});

usernameInput.addEventListener('blur', () => {
  rulesSpan.textContent = '';
});

//Email validation
document.getElementById('email').addEventListener('input', function (ev) {
  let emailInput = ev.currentTarget;
  let email = emailInput.value;

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailInput.classList.add('class', 'valid-text');
    emailInput.classList.remove('class', 'invalid-text');
    isEmailValid = true;
  } else {
    emailInput.classList.remove('class', 'valid-text');
    emailInput.classList.add('class', 'invalid-text');
    isEmailValid = false;
  }
});

const emailInput = document.getElementById('email');
const rulesSpanEmail = document.getElementById('rulesEmail');
emailInput.addEventListener('focus', () => {
  rulesSpanEmail.innerHTML = `
    <ul class = "Rules">
      <li>Please enter a valid email address.</li>
    </ul>
  `;
});

emailInput.addEventListener('blur', () => {
  rulesSpanEmail.textContent = '';
});

///////
//Password Validation
document.getElementById('password').addEventListener('input', function (ev) {
  let passwordInput = ev.currentTarget;
  let password = passwordInput.value;

  if (/^(?=.*[A-Z])(?=.*\d)(?=.*[/*\-+!@#$^&~\[\]]).{8,}$/.test(password)) {
    passwordInput.classList.add('class', 'valid-text');
    passwordInput.classList.remove('class', 'invalid-text');
    isPasswordValid = true;
  } else {
    passwordInput.classList.remove('class', 'valid-text');
    passwordInput.classList.add('class', 'invalid-text');
    isPasswordValid = false;
  }
});

const passwordInput = document.getElementById('password');
const rulesSpanPassword = document.getElementById('rulesPassword');
passwordInput.addEventListener('focus', () => {
  rulesSpanPassword.innerHTML = `
    <ul class = "Rules">
      <li>Password criteria:</li>
      <li>Contains 8 or more characters</li>
      <li>Contains at least 1 upper case</li>
      <li>Contains at least 1 lower case</li>
      <li>Contains at least 1 of these special characters:  </li>
      <li>/ * - + ! @ # $ ^ & ~ [ ]</li>
    </ul>
  `;
});

passwordInput.addEventListener('blur', () => {
  rulesSpanPassword.textContent = '';
});

/////////
//Confirm Password Validation
document
  .getElementById('confirm_password')
  .addEventListener('input', function (ev) {
    let conPasswordInput = ev.currentTarget;
    let conPassword = conPasswordInput.value;
    let password = passwordInput.value;

    if (conPassword == password) {
      conPasswordInput.classList.add('class', 'valid-text');
      conPasswordInput.classList.remove('class', 'invalid-text');
      isConfirmPasswordValid = true;
    } else {
      conPasswordInput.classList.remove('class', 'valid-text');
      conPasswordInput.classList.add('class', 'invalid-text');
      isConfirmPasswordValid = false;
    }
  });

const conPasswordInput = document.getElementById('confirm_password');
const rulesSpanConPassword = document.getElementById('rulesConPass');

conPasswordInput.addEventListener('focus', () => {
  rulesSpanConPassword.innerHTML = `
    <ul class="Rules">
      <li>Please confirm the password</li>
    </ul>
  `;
});

conPasswordInput.addEventListener('blur', () => {
  rulesSpanConPassword.textContent = '';
});


document.getElementById('registerButton').addEventListener('click', function (ev) {
  if (!isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    ev.preventDefault();
    alert('Pleaase make sure all of the inputs are properly met.')
    // Display an error message to the user, e.g. "Please fill out all required fields correctly."
  } else {
    // all the inputs are valid, then it will sumbit the registration form
    document.getElementById('registerButton').submit(); 
  }
});
