let date = new Date();
let shownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
let currentMonth = date.getMonth();
let yearCorrection = 0;
let monthCorrection = 0;
let dayCorrection = 0;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
function load() {
  console.log(currentMonth + 1);
  showCalendarMonth();
}
function correctMonth(correctionType) {
  if(correctionType == "next") {
    monthCorrection++;
  } else if (correctionType == "previous") {
    monthCorrection--;
  }
  updateDate();
  monthCorrection = 0;
  showCalendarMonth();
}
function correctDay(correctionType, amount) {
  if(correctionType == "next") {
    dayCorrection = amount;
  } else if (correctionType == "previous") {
    dayCorrection = amount * -1;
  }
  updateDate();
  dayCorrection = 0;
  if(amount == 1) {
    showCalendarDay();
  } else {
    showCalendarWeek();
  }
}
function updateDate() {
  shownDate = new Date(shownDate.getFullYear(), shownDate.getMonth() + monthCorrection, shownDate.getDate() + dayCorrection);
}
function todayMonth() {
  shownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  showCalendarMonth();
}
function todayWeek() {
  shownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  showCalendarWeek();
}
function todayDay() {
  shownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  showCalendarDay();
}
function showCalendarMonth() {
  let firstDayofCurrentlyShownMonth = new Date(shownDate.getFullYear(), shownDate.getMonth(), 1);
  let extraDaysBeforeFirstOfMonth = firstDayofCurrentlyShownMonth.getDay() - 1;
  let firstShownDate = new Date(shownDate.getFullYear(), shownDate.getMonth(), 1 - extraDaysBeforeFirstOfMonth);
  let datesShown = 0;
  let calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.className = "monthView";
  calendar.appendChild(viewElement);
  let monthTopElement = document.createElement('div');
  viewElement.appendChild(monthTopElement);
  monthTopElement.className = "monthTop";
  let previousButton = document.createElement('button');
  previousButton.className = "previous";
  previousButton.innerHTML = "<";
  previousButton.setAttribute("onclick", 'correctMonth("previous")');
  monthTopElement.appendChild(previousButton);
  let monthSpanElement = document.createElement('span');
  monthTopElement.appendChild(monthSpanElement);
  monthSpanElement.innerHTML = months[shownDate.getMonth()] + " " + shownDate.getFullYear();
  let showTodayButton = document.createElement('button');
  showTodayButton.className = "btnToday";
  showTodayButton.innerHTML = "Today";
  showTodayButton.setAttribute("onclick", 'todayMonth()');
  monthTopElement.appendChild(showTodayButton);
  let nextButton = document.createElement('button');
  nextButton.className = "next";
  nextButton.innerHTML = ">";
  nextButton.setAttribute("onclick", 'correctMonth("next")');
  monthTopElement.appendChild(nextButton);
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
      if (i != 0) {
        let dateSpanElement = document.createElement('span');
        dateSpanElement.className = "dateElement";
        let dateOnScreen = new Date(firstShownDate.getFullYear(), firstShownDate.getMonth(), firstShownDate.getDate() + datesShown);
        dateSpanElement.innerHTML = dateOnScreen.getDate();
        dayElement.setAttribute("onclick", 'newPlan(' + dateOnScreen.getDate() + ', ' + dateOnScreen.getMonth() + ', ' + dateOnScreen.getFullYear() + ')');
        dayElement.appendChild(dateSpanElement);
        datesShown++;
        console.log(datesShown - 1);
      }
      if(i==0) {
        let spanElement = document.createElement('span');
        dayElement.appendChild(spanElement);
        spanElement.innerHTML = days[j];
      }
    }
  }
}
function showCalendarWeek() {
  let firstDayofCurrentlyShownWeek = new Date(shownDate.getFullYear(), shownDate.getMonth(), shownDate.getDate() - (shownDate.getDay() - 1));
  console.log(firstDayofCurrentlyShownWeek);
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.className = "weekView";
  calendar.appendChild(viewElement);
  let weekTopElement = document.createElement('div');
  viewElement.appendChild(weekTopElement);
  weekTopElement.className = "weekTop";
  let previousButton = document.createElement('button');
  previousButton.className = "previous";
  previousButton.innerHTML = "<";
  previousButton.setAttribute("onclick", 'correctDay("previous", 7)');
  weekTopElement.appendChild(previousButton);
  let monthSpanElement = document.createElement('span');
  weekTopElement.appendChild(monthSpanElement);
  monthSpanElement.innerHTML = months[shownDate.getMonth()] + " " + shownDate.getFullYear();
  let showTodayButton = document.createElement('button');
  showTodayButton.className = "btnToday";
  showTodayButton.innerHTML = "Today";
  showTodayButton.setAttribute("onclick", 'todayWeek()');
  weekTopElement.appendChild(showTodayButton);
  let nextButton = document.createElement('button');
  nextButton.className = "next";
  nextButton.innerHTML = ">";
  nextButton.setAttribute("onclick", 'correctDay("next", 7)');
  weekTopElement.appendChild(nextButton);
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
      let dateOnScreen = new Date(firstDayofCurrentlyShownWeek.getFullYear(), firstDayofCurrentlyShownWeek.getMonth(), firstDayofCurrentlyShownWeek.getDate() + j);
      if(i==0) {
        let spanElement = document.createElement('span');
        dayElement.appendChild(spanElement);
        spanElement.innerHTML = days[j] + " " + dateOnScreen.getDate();
      }
      if(i==1) {
        for (let i = 0; i < 25; i++) {
          let dividerDivElement = document.createElement('div');
          let dividerLineElement = document.createElement('div');
          dayElement.appendChild(dividerDivElement);
          dividerDivElement.className = "divider";
          dividerDivElement.id = i + ":00";
          let timeStampelement = document.createElement('span');
          dividerDivElement.appendChild(timeStampelement);
          timeStampelement.innerHTML = i + ":00";
          dividerDivElement.appendChild(dividerLineElement);
          dividerLineElement.className = "dividerLine";
        }
      }
      dayElement.setAttribute("onclick", 'newPlan(' + dateOnScreen.getDate() + ', ' + dateOnScreen.getMonth() + ', ' + dateOnScreen.getFullYear() + ')');
    }
  }
}
function showCalendarDay() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";
  let viewElement = document.createElement('div');
  viewElement.className = "dayView";
  calendar.appendChild(viewElement);
  let dayTopElement = document.createElement('div');
  viewElement.appendChild(dayTopElement);
  let dayViewElement = document.createElement('div');
  viewElement.appendChild(dayViewElement);
  dayViewElement.className = "dayViewBottom";
  let previousButton = document.createElement('button');
  previousButton.className = "previous";
  previousButton.innerHTML = "<";
  previousButton.setAttribute("onclick", 'correctDay("previous", 1)');
  dayTopElement.appendChild(previousButton);
  let spanElement = document.createElement('span');
  dayTopElement.appendChild(spanElement);
  spanElement.innerHTML = days[shownDate.getDay()] + " " + shownDate.getDate() + ", " + months[shownDate.getMonth()] + " " + shownDate.getFullYear();
  let showTodayButton = document.createElement('button');
  showTodayButton.className = "btnToday";
  showTodayButton.innerHTML = "Today";
  showTodayButton.setAttribute("onclick", 'todayWeek()');
  dayTopElement.appendChild(showTodayButton);
  let nextButton = document.createElement('button');
  nextButton.className = "next";
  nextButton.innerHTML = ">";
  nextButton.setAttribute("onclick", 'correctDay("next", 1)');
  dayTopElement.appendChild(nextButton);
  dayTopElement.className = "dayViewTop";
  for (let i = 0; i < 25; i++) {
    let dividerDivElement = document.createElement('div');
    let dividerLineElement = document.createElement('div');
    dayViewElement.appendChild(dividerDivElement);
    dividerDivElement.className = "divider";
    dividerDivElement.id = i + ":00";
    let timeStampelement = document.createElement('span');
    dividerDivElement.appendChild(timeStampelement);
    timeStampelement.innerHTML = i + ":00";
    dividerDivElement.appendChild(dividerLineElement);
    dividerLineElement.className = "dividerLine";
  }
}