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
  document.getElementById("calendar").innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.id = "monthView";
  document.getElementById("calendar").appendChild(viewElement);
  for(let i = 0; i < 6; i++) {
    let weekElement = document.createElement('div');
    viewElement.appendChild(weekElement);
    weekElement.id = "week";
    weekElement.classList.add("week" + i);
    for(let j = 0; j < 7; j++) {
      let dayElement = document.createElement('div');
      weekElement.appendChild(dayElement);
      dayElement.id = "day";
      dayElement.classList.add("day" + (j+1));
      if(j == 0 && i == 0) {
        let previousButton = document.createElement('button');
        previousButton.className = "previous";
        previousButton.innerHTML = "<";
        dayElement.appendChild(previousButton);
        dayElement.classList.add("previous");
      }
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
      if (j == 6 && i == 0) {
        let nextButton = document.createElement('button');
        nextButton.className = "next";
        nextButton.innerHTML = ">";
        dayElement.appendChild(nextButton);
        dayElement.classList.add("next");
      }
    }
  }
}
function showCalendarWeek() {
  document.getElementById("calendar").innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.id = "weekView";
  document.getElementById("calendar").appendChild(viewElement);
  for(let i = 0; i < 2; i++) {
    let weekElement = document.createElement('div');
    viewElement.appendChild(weekElement);
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
      if(i==1) {
        for (let i = 0; i < 25; i++) {
          let dividerDivElement = document.createElement('div');
          let dividerLineElement = document.createElement('div');
          dayElement.appendChild(dividerDivElement);
          dividerDivElement.className = "divider"
          let timeStampelement = document.createElement('span');
          dividerDivElement.appendChild(timeStampelement);
          timeStampelement.innerHTML = i + ":00";
          dividerDivElement.appendChild(dividerLineElement);
          dividerLineElement.className = "dividerLine";
        }
      }
    }
  }
}
function showCalendarDay() {
  document.getElementById("calendar").innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.id = "dayView";
  document.getElementById("calendar").appendChild(viewElement);
  let spanElement = document.createElement('span');
  viewElement.appendChild(spanElement);
  let dayViewElement = document.createElement('div');
  viewElement.appendChild(dayViewElement);
  dayViewElement.className = "dayView";
  let day = 0;
  switch(day) {
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
  for (let i = 0; i < 25; i++) {
    let dividerDivElement = document.createElement('div');
    let dividerLineElement = document.createElement('div');
    dayViewElement.appendChild(dividerDivElement);
    dividerDivElement.className = "divider"
    let timeStampelement = document.createElement('span');
    dividerDivElement.appendChild(timeStampelement);
    timeStampelement.innerHTML = i + ":00";
    dividerDivElement.appendChild(dividerLineElement);
    dividerLineElement.className = "dividerLine";
  }
}