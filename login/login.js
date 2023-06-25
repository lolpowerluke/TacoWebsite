let firstUrlPart = 'http://10.3.50.7:8080/tacoapi-TacoAPI.1.1.0/'
function signUp() {
  let username = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if(password == confirmPassword) {
    createAccount(username, password, firstname, lastname);
  } else {
    alert("passwords do not match");
  }
}
function load() {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
  if(username != null && password != null) {
    authenticate(username, password);
  }
}
async function createAccount(username, password, firstname, lastname) {
  const response = await fetch(firstUrlPart + 'Account/create?username=' + username + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname);
  const myJson = await response.json();
  console.log(myJson);
  if(myJson.success == true) {
    authenticate(username, password);
  }
}
function login() {
  let username = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  authenticate(username, password);
}
async function authenticate(username, password) {
  const response = await fetch(firstUrlPart + 'Account/check?username=' + username + '&password=' + password);
  const myJson = await response.json();
  if(myJson.success == true) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("id", myJson.id);
    window.location.href = "../index.html";
  } else {
    alert("incorrect username or password");
  }
}