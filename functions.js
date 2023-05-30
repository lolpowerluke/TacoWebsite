function signUp() {
  let username = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;
  if(password == confirmPassword) {
    createAccount(username, password);
  } else {
    alert("passwords do not match");
  }
}
async function createAccount(username, password) {
  const response = await fetch('http://jurnas.synology.me:7070/tacoapi-TacoAPI.0.3/Account/create?username=' + username + '&password=' + password);
}
function showCalendarMonth() {
  let nav = 0;
  document.getElementById("calendar").innerHTML = "";
  for(let i = 0; i < 6; i++) {
    let weekElement = document.createElement('div');
    document.getElementById("calendar").appendChild(weekElement);
    weekElement.id = "week";
    weekElement.classList.add("week" + i);
    for(let j = 0; j < 7; j++) {
      let dayElement = document.createElement('div');
      weekElement.appendChild(dayElement);
      dayElement.id = "day";
      dayElement.classList.add("day" + (j+1))
      if(i==0) {
        let spanElement = document.createElement('span');
        dayElement.appendChild(spanElement);
        switch(j) {
          case 0:
            spanElement.innerHTML = "Monday";
            break;
          case 1:
            spanElement.innerHTML = "Tuesday";
            break;
          case 2:
            spanElement.innerHTML = "Wednasday";
            break;
          case 3:
            spanElement.innerHTML = "Thursday";
            break;
          case 4:
            spanElement.innerHTML = "Friday";
            break;
          case 5:
            spanElement.innerHTML = "Saturday";
            break;
          case 6:
            spanElement.innerHTML = "Sunday";
            break;
        }
      }
    }
  }
}
