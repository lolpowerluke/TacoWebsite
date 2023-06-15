let date = new Date();
let shownDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
let currentMonth = date.getMonth();
let yearCorrection = 0;
let monthCorrection = 0;
let dayCorrection = 0;
let titleValue = undefined;
let descriptionValue = undefined;
let startTimeValue = undefined;
let endTimeValue = undefined;
let timeslotHoursLeft = 0;
let myEventJson;
let firstUrlPart = 'http://10.3.50.7:8080/tacoapi-TacoAPI.1.1.0/'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
async function createAccount(username, password, firstname, lastname) {
  const response = await fetch(firstUrlPart + 'Account/create?username=' + username + '&password=' + password + '&firstname=' + firstname + '&lastname=' + lastname);
  const myJson = await response.json();
  console.log(myJson.error);
}
function load() {
  shownDate = new Date(2023, 4, 5)
  requestEventsWeek();
}
async function requestEventsDay() {
  let dayDate = shownDate.getDate();
  if(dayDate < 10) {
    dayDate = "0" + dayDate;
  }
  let dayMonth = shownDate.getMonth() + 1;
  if(dayMonth < 10) {
    dayMonth = "0" + dayMonth;
  }
  const eventsDay = await fetch(firstUrlPart + 'Appointment/dayView?date=' + shownDate.getFullYear() + '-' + dayMonth + '-' + dayDate);
  const myJson = await eventsDay.json();
  console.log(myJson);
  myEventJson = myJson;
  showCalendarDay();
}
async function requestEventsWeek() {
  let firstDayOfWeek = new Date(shownDate.getFullYear(), shownDate.getMonth(), (shownDate.getDate() - shownDate.getDay() + 1));
  let weekDate = firstDayOfWeek.getDate();
  if(weekDate < 10) {
    weekDate = "0" + weekDate;
  }
  let weekMonth = firstDayOfWeek.getMonth() + 1;
  if(weekMonth < 10) {
    weekMonth = "0" + weekMonth;
  }
  console.log(firstUrlPart + 'Appointment/weekView?day=' + firstDayOfWeek.getFullYear() + '-' + weekMonth + '-' + weekDate);
  const eventsWeek = await fetch(firstUrlPart + 'Appointment/weekView?day=' + firstDayOfWeek.getFullYear() + '-' + weekMonth + '-' + weekDate);
  const myJson = await eventsWeek.json();
  console.log(myJson);
  myEventJson = myJson;
  showCalendarWeek();
}
async function requestEventsMonth() {
  let monthDate = shownDate.getDate();
  if(monthDate < 10) {
    monthDate = "0" + monthDate;
  }
  let monthMonth = shownDate.getMonth() + 1;
  if(monthMonth < 10) {
    monthMonth = "0" + monthMonth;
  }
  const eventsMonth = await fetch(firstUrlPart + 'Appointment/monthView?startday=' + shownDate.getFullYear() + '-' + monthMonth + '-' + monthDate);
  const myJson = await eventsMonth.json();
  console.log(myJson);
  myEventJson = myJson;
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
    requestEventsDay();
  } else {
    requestEventsWeek();
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
        for (let k = 0; k < 25; k++) {
          let dividerDivElement = document.createElement('div');
          let dividerLineElement = document.createElement('div');
          dayElement.appendChild(dividerDivElement);
          dividerDivElement.className = "divider";
          dividerDivElement.id = k + ":00";

          let timeStampelement = document.createElement('span');
          dividerDivElement.appendChild(timeStampelement);
          timeStampelement.innerHTML = k + ":00";
          dividerDivElement.appendChild(dividerLineElement);
          dividerLineElement.className = "dividerLine";
          
          for(let l = 0; l < myEventJson[j].length; l++) {
            for(let m = 0; m < myEventJson[j][l].length; m++) {
              let eventDate = new Date(myEventJson[j][l][m].time);
              if(k == eventDate.getHours()) {
                let eventDivElement = document.createElement("div");
                dayElement.appendChild(eventDivElement);
                eventDivElement.className = "eventDivElement";
                eventDivElement.id = myEventJson[j][l][m].type;
                
                let eventSpanTitleElement = document.createElement("span");
                eventDivElement.appendChild(eventSpanTitleElement);
                eventSpanTitleElement.innerHTML = myEventJson[j][l][m].name;
                eventSpanTitleElement.className = "eventTitleElement";
      
                let eventSpanDashElement = document.createElement("span");
                eventDivElement.appendChild(eventSpanDashElement);
                eventSpanDashElement.innerHTML = " - "
      
                let eventSpanDescrtiptionElement = document.createElement("span");
                eventDivElement.appendChild(eventSpanDescrtiptionElement);
                eventSpanDescrtiptionElement.innerHTML = myEventJson[j][l][m].description;
                eventSpanDescrtiptionElement.className = "eventDescriptionElement";
              }
            }
          }
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
  dayTopElement.className = "dayViewTop";
  viewElement.appendChild(dayTopElement);

  let previousButton = document.createElement('button');
  previousButton.className = "previous";
  previousButton.innerHTML = "<";
  previousButton.setAttribute("onclick", 'correctDay("previous", 1)');
  dayTopElement.appendChild(previousButton);

  let addEventButton = document.createElement('button');
  addEventButton.className = "btnToday";
  addEventButton.innerHTML = "Add Event";
  addEventButton.setAttribute("onclick", 'todayWeek()');
  dayTopElement.appendChild(addEventButton);
  addEventButton.setAttribute("onclick", 'newPlan(' + shownDate.getDate() + ', ' + shownDate.getMonth() + ', ' + shownDate.getFullYear() + ')');

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

  let dayViewElement = document.createElement('div');
  viewElement.appendChild(dayViewElement);
  dayViewElement.className = "dayViewBottom";
  dayViewElement.setAttribute("onclick", 'newPlan(' + shownDate.getDate() + ', ' + shownDate.getMonth() + ', ' + shownDate.getFullYear() + ')');

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
    
    for(let j = 0; j < myEventJson.length; j++) {
      for(let k = 0; k < myEventJson[j].length; k++) {
        let eventDate = new Date(myEventJson[j][k].time);
        if(i == eventDate.getHours()) {
          let eventDivElement = document.createElement("div");
          dayViewElement.appendChild(eventDivElement);
          eventDivElement.className = "eventDivElement";
          eventDivElement.id = myEventJson[j][k].type;
          
          let eventSpanTitleElement = document.createElement("span");
          eventDivElement.appendChild(eventSpanTitleElement);
          eventSpanTitleElement.innerHTML = myEventJson[j][k].name;
          eventSpanTitleElement.className = "eventTitleElement";

          let eventSpanDashElement = document.createElement("span");
          eventDivElement.appendChild(eventSpanDashElement);
          eventSpanDashElement.innerHTML = " - "

          let eventSpanDescrtiptionElement = document.createElement("span");
          eventDivElement.appendChild(eventSpanDescrtiptionElement);
          eventSpanDescrtiptionElement.innerHTML = myEventJson[j][k].description;
          eventSpanDescrtiptionElement.className = "eventDescriptionElement";
        }
      }
    }
  }
}

function newPlan(date, month, year, type) {
  let popupContainer = document.getElementById("popupContainer");
  popupContainer.innerHTML = "";
  popupContainer.className = "addEventPopupShown";

  let addEventContainer = document.createElement('div');
  popupContainer.appendChild(addEventContainer);
  addEventContainer.id = "addEventContainer";

  createCancelBtn();

  if(type == "Class" || type == "Personal event" || type == undefined) {
  createTitleElement("");

    let eventTypeDivElement = document.createElement("div");
    eventTypeDivElement.className = "select";
    addEventContainer.appendChild(eventTypeDivElement);

    let multipleChoiceDropDown = document.createElement("select");
    multipleChoiceDropDown.className = "typeEventChoiceDropDown";
    multipleChoiceDropDown.id = "eventType";
    if(date != undefined && month != undefined && year != undefined) {
      multipleChoiceDropDown.setAttribute("onchange", 'updateAddEventContainer(' + date + ', ' + month + ', ' + year + ')');
    } else {
      multipleChoiceDropDown.setAttribute("onchange", 'updateAddEventContainer()');
    }
    eventTypeDivElement.appendChild(multipleChoiceDropDown);
    for(let i = 0; i < 3; i++) {
      let multipleChoiceOption = document.createElement("option");
      multipleChoiceDropDown.appendChild(multipleChoiceOption);
      switch(i) {
        case 0:
          if(type == "Personal event") {
            multipleChoiceOption.setAttribute('selected', 'selected')
          }
          multipleChoiceOption.value = "Personal event";
          multipleChoiceOption.innerHTML = "Personal event";
          break;
        case 1:
          if(type == "Class") {
            multipleChoiceOption.setAttribute('selected', 'selected')
          }
          multipleChoiceOption.value = "Class";
          multipleChoiceOption.innerHTML = "Class";
          break;
        case 2:
          if(type == "Add timeslot to existing task") {
            multipleChoiceOption.setAttribute('selected', 'selected')
          }
          multipleChoiceOption.value = "Add timeslot to existing task";
          multipleChoiceOption.innerHTML = "Add timeslot to existing task";
          break;
      }
    }

    createDescriptionElement(14);

    let timeDivElement = document.createElement('div');
    addEventContainer.appendChild(timeDivElement);
    timeDivElement.className = "addTimeStamps";

    let timeStartSpanElement = document.createElement('span');
    timeDivElement.appendChild(timeStartSpanElement);
    timeStartSpanElement.innerHTML = "Start time";

    let timeStartInputElement = document.createElement('input');
    timeDivElement.appendChild(timeStartInputElement);
    timeStartInputElement.id = "startTime";
    timeStartInputElement.setAttribute("type", "time");

    let timeStopSpanElement = document.createElement('span');
    timeDivElement.appendChild(timeStopSpanElement);
    timeStopSpanElement.innerHTML = "End time";

    let timeStopInputElement = document.createElement('input');
    timeDivElement.appendChild(timeStopInputElement);
    timeStopInputElement.id = "endTime";
    timeStopInputElement.setAttribute("type", "time");

  let dateDivElement = document.createElement('div');
  addEventContainer.appendChild(dateDivElement);
  dateDivElement.className = "addDates";

  let dateStartSpanElement = document.createElement('span');
  dateDivElement.appendChild(dateStartSpanElement);
  dateStartSpanElement.innerHTML = "Start date";

  let dateStartInputElement = document.createElement('input');
  dateDivElement.appendChild(dateStartInputElement);
  dateStartInputElement.id = "startDate";
  dateStartInputElement.setAttribute("type", "date");

  let dateStopSpanElement = document.createElement('span');
  dateDivElement.appendChild(dateStopSpanElement);
  dateStopSpanElement.innerHTML = "End date";

  let dateStopInputElement = document.createElement('input');
  dateDivElement.appendChild(dateStopInputElement);
  dateStopInputElement.id = "endDate";
  dateStopInputElement.setAttribute("type", "date");

    if(date != undefined && month != undefined && year != undefined) {
      let newEventDate = new Date(year, month, date);
      let newEventDateMonth = newEventDate.getMonth();
      if(newEventDateMonth < 10) {
        newEventDateMonth = "0" + (newEventDateMonth + 1);
      }
      let newEventDateDate = newEventDate.getDate();
      if(newEventDateDate < 10) {
        newEventDateDate = "0" + newEventDateDate;
      }
      dateStartInputElement.setAttribute("value", newEventDate.getFullYear() + "-" + newEventDateMonth + "-" + newEventDateDate);
      dateStopInputElement.setAttribute("value", newEventDate.getFullYear() + "-" + newEventDateMonth + "-" + newEventDateDate);
    }

    let createEventBtn = document.createElement('button');
    createEventBtn.innerHTML = "Create Event";
    createEventBtn.className = "addEventToDatabase";
    createEventBtn.setAttribute("onclick", 'addEventToDatabase()');
    addEventContainer.appendChild(createEventBtn);
  } else if(type == "Add timeslot to existing task") {
    let eventTypeDivElement = document.createElement("div");
    eventTypeDivElement.className = "select";
    addEventContainer.appendChild(eventTypeDivElement);

    let multipleChoiceDropDown = document.createElement("select");
    multipleChoiceDropDown.className = "typeEventChoiceDropDown";
    multipleChoiceDropDown.id = "eventType";
    if(date != undefined && month != undefined && year != undefined) {
      multipleChoiceDropDown.setAttribute("onchange", 'updateAddEventContainerTimeslotView(' + date + ', ' + month + ', ' + year + ')');
    } else {
      multipleChoiceDropDown.setAttribute("onchange", 'updateAddEventContainerTimeslotView()');
    }
    eventTypeDivElement.appendChild(multipleChoiceDropDown);
    for(let i = 0; i < 3; i++) {
      let multipleChoiceOption = document.createElement("option");
      multipleChoiceDropDown.appendChild(multipleChoiceOption);
      switch(i) {
        case 0:
          if(type == "Personal event") {
            multipleChoiceOption.setAttribute('selected', 'selected');
          }
          multipleChoiceOption.value = "Personal event";
          multipleChoiceOption.innerHTML = "Personal event";
          break;
        case 1:
          if(type == "Class") {
            multipleChoiceOption.setAttribute('selected', 'selected');
          }
          multipleChoiceOption.value = "Class";
          multipleChoiceOption.innerHTML = "Class";
          break;
        case 2:
          if(type == "Add timeslot to existing task") {
            multipleChoiceOption.setAttribute('selected', 'selected');
          }
          multipleChoiceOption.value = "Add timeslot to existing task";
          multipleChoiceOption.innerHTML = "Add timeslot to existing task";
          break;
      }
    }
    let taskListDivElement = document.createElement('div');
    taskListDivElement.className = "taskList";
    addEventContainer.appendChild(taskListDivElement);
    //exampleArray
    let array = ["1", "10", "100"];
    for (let i = 0; i < array.length; i++) {
      let taskDivElement = document.createElement('div');
      taskListDivElement.appendChild(taskDivElement);
      taskDivElement.className = "taskElement";
      taskDivElement.innerHTML = array[i];
    }
    let createNewTaskBtn = document.createElement('button');
    createNewTaskBtn.className = "createNewEvent";
    createNewTaskBtn.innerHTML = "Create new task";
    createNewTaskBtn.setAttribute('onclick', 'createNewTask(' + date + ', ' + month + ', ' + year + ')');
    addEventContainer.appendChild(createNewTaskBtn);
  }
}
function cancelNewPlan() {
  document.getElementById("popupContainer").innerHTML = "";
  document.getElementById("popupContainer").className = "";
}
function naarProfile() {
  window.location.href = "profile.html";
}
function addEventToDatabase() {
  console.log("waiting for API to respond...");
  cancelNewPlan();
}
function addTaskToDatabase() {
  console.log("waiting for API to respond...");
  addTimeslot();
}
function addTimeslotToDatabase() {
  console.log("waiting for API to respond...");
  cancelNewPlan();
}
function addTimeslot(neededTimeslots) {
  if (neededTimeslots == undefined) {
    let neededTimeslotsRead = document.getElementById("neededTimeslots").value;
    neededTimeslots = neededTimeslotsRead - 1;
  } else {
    neededTimeslots--;
  }
  let inputHoursNeeded = document.getElementById("hoursNeeded");
  if (inputHoursNeeded != null) {
    timeslotHoursLeft = inputHoursNeeded.value
  }
  let inputMinusHoursNeeded = document.getElementById("minusHoursNeeded");
  if(inputMinusHoursNeeded != null) {
    timeslotHoursLeft = timeslotHoursLeft - inputMinusHoursNeeded.value;
  }
  addTimeslotToDatabase();

  let popupContainer = document.getElementById("popupContainer");
  popupContainer.innerHTML = "";
  popupContainer.className = "addEventPopupShown";

  let addEventContainer = document.createElement('div');
  popupContainer.appendChild(addEventContainer);
  addEventContainer.id = "addEventContainer";

  createCancelBtn();

  createTitleElement("readonly");

  createDescriptionElement(16, "readonly");

  let timeDivElement = document.createElement('div');
  addEventContainer.appendChild(timeDivElement);
  timeDivElement.className = "addTimeStamps";

  let timeHoursNeededSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeHoursNeededSpanElement);
  timeHoursNeededSpanElement.innerHTML = "Hours needed (" + timeslotHoursLeft + " left)";

  let timeHoursNeededInputElement = document.createElement('input');
  timeDivElement.appendChild(timeHoursNeededInputElement);
  timeHoursNeededInputElement.id = "minusHoursNeeded";
  timeHoursNeededInputElement.setAttribute("type", "number");

  let timeStartSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeStartSpanElement);
  timeStartSpanElement.innerHTML = "Start time";

  let timeStartInputElement = document.createElement('input');
  timeDivElement.appendChild(timeStartInputElement);
  timeStartInputElement.id = "startTime";
  timeStartInputElement.setAttribute("type", "time");

  let dateDivElement = document.createElement('div');
  addEventContainer.appendChild(dateDivElement);
  dateDivElement.className = "addDates";

  let dateStartSpanElement = document.createElement('span');
  dateDivElement.appendChild(dateStartSpanElement);
  dateStartSpanElement.innerHTML = "Start date";

  let dateStartInputElement = document.createElement('input');
  dateDivElement.appendChild(dateStartInputElement);
  dateStartInputElement.id = "startDate";
  dateStartInputElement.setAttribute("type", "date");

  let timeStopSpanElement = document.createElement('span');
  dateDivElement.appendChild(timeStopSpanElement);
  timeStopSpanElement.innerHTML = "End time";

  let timeStopInputElement = document.createElement('input');
  dateDivElement.appendChild(timeStopInputElement);
  timeStopInputElement.id = "endTime";
  timeStopInputElement.setAttribute("type", "time");

  if (neededTimeslots != 0) {
    let createTimslotBtn = document.createElement('button');
    createTimslotBtn.innerHTML = "Create timeslot (" + neededTimeslots + " left)";
    createTimslotBtn.className = "addTimeslotToDatabase";
    createTimslotBtn.setAttribute("onclick", 'addTimeslot(' + neededTimeslots + ')');
    addEventContainer.appendChild(createTimslotBtn);
  } else {
    let createTimslotBtn = document.createElement('button');
    createTimslotBtn.innerHTML = "Create last timeslot";
    createTimslotBtn.className = "addTimeslotToDatabase";
    createTimslotBtn.setAttribute("onclick", 'addTimeslotToDatabase()');
    addEventContainer.appendChild(createTimslotBtn);
  }
  fillNewForm(titleValue, descriptionValue, undefined, undefined);
}
function naarCalendar() {
  window.location.href = "index.html";
}
function updateAddEventContainer(date, month, year) {
  let eventType = document.getElementById("eventType").value;
  titleValue = document.getElementById("title").value;
  descriptionValue = document.getElementById("description").value;
  startTimeValue = document.getElementById("startTime").value;
  endTimeValue = document.getElementById("endTime").value;
  console.log(titleValue,", ", descriptionValue,", ", startTimeValue,", ", endTimeValue);
  newPlan(date, month, year, eventType);
  if(eventType != "Add timeslot to existing task") {
    fillNewForm(titleValue, descriptionValue, startTimeValue, endTimeValue);
  }
  console.log(titleValue,", ", descriptionValue,", ", startTimeValue,", ", endTimeValue);
}
function fillNewForm(titleValueA, descriptionValueA, startTimeValueA, endTimeValueA) {
  if(titleValueA != undefined) {
    document.getElementById("title").value = titleValueA;
  }
  if(descriptionValueA != undefined) {
    document.getElementById("description").value = descriptionValueA;
  }
  if(startTimeValueA != undefined) {
    document.getElementById("startTime").value = startTimeValueA;
  }
  if(endTimeValueA != undefined){
    document.getElementById("endTime").value = endTimeValueA;
  }
}
function updateAddEventContainerTimeslotView(date, month, year) {
  let eventType = document.getElementById("eventType").value;
  newPlan(date, month, year, eventType);
}
function createNewTask(date, month, year) {
  addNewTask(date, month, year);
}
function addNewTask(date, month, year) {
  let popupContainer = document.getElementById("popupContainer");
  popupContainer.innerHTML = "";
  popupContainer.className = "addEventPopupShown";

  let addEventContainer = document.createElement('div');
  popupContainer.appendChild(addEventContainer);
  addEventContainer.id = "addEventContainer";

  createCancelBtn();

  createTitleElement("");

  createDescriptionElement(16);

  let timeDivElement = document.createElement('div');
  addEventContainer.appendChild(timeDivElement);
  timeDivElement.className = "addTimeStamps";

  let timeNeededSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeNeededSpanElement);
  timeNeededSpanElement.innerHTML = "Hours needed";

  let timeStartInputElement = document.createElement('input');
  timeDivElement.appendChild(timeStartInputElement);
  timeStartInputElement.id = "hoursNeeded";
  timeStartInputElement.setAttribute("type", "number");

  let timeStopSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeStopSpanElement);
  timeStopSpanElement.innerHTML = "Timeslots needed";

  let timeStopInputElement = document.createElement('input');
  timeDivElement.appendChild(timeStopInputElement);
  timeStopInputElement.id = "neededTimeslots";
  timeStopInputElement.setAttribute("type", "number");

  let dueDateDivElement = document.createElement('div');
  addEventContainer.appendChild(dueDateDivElement);
  dueDateDivElement.className = "addDueDate";

  let dueDateSpanElement = document.createElement('span');
  dueDateDivElement.appendChild(dueDateSpanElement);
  dueDateSpanElement.innerHTML = "Due date";

  let dueDateInputElement = document.createElement('input');
  dueDateDivElement.appendChild(dueDateInputElement);
  dueDateInputElement.id = "dueDate";
  dueDateInputElement.setAttribute("type", "date");

  let createEventBtn = document.createElement('button');
  createEventBtn.innerHTML = "Create Task";
  createEventBtn.className = "addEventToDatabase";
  createEventBtn.setAttribute("onclick", 'addTimeslot()');
  addEventContainer.appendChild(createEventBtn);
  fillNewForm(titleValue, descriptionValue, undefined, undefined);
}
function createCancelBtn() {
  let cancelNewPlanBtn = document.createElement('button');
  addEventContainer.appendChild(cancelNewPlanBtn);
  cancelNewPlanBtn.className = "closeNewEvent";
  cancelNewPlanBtn.setAttribute("onclick", 'cancelNewPlan()');
  for(let i = 0; i < 2; i++) {
    let divCloseNewPlan = document.createElement('div');
    cancelNewPlanBtn.appendChild(divCloseNewPlan);
  }
}
function createTitleElement(readmode) {
  let titleDivElement = document.createElement('div');
  addEventContainer.appendChild(titleDivElement);
  titleDivElement.className = "addTitle";

  let titleSpanElement = document.createElement('span');
  titleDivElement.appendChild(titleSpanElement);
  titleSpanElement.innerHTML = "Title";

  let titleInputElement = document.createElement('input');
  titleDivElement.appendChild(titleInputElement);
  titleInputElement.id = "title";
  titleInputElement.setAttribute("type", "text");
  if (readmode == "readonly") {
    titleInputElement.setAttribute("readonly", "");
  }
}
function createDescriptionElement(rows, readmode) {
  let descriptionDivElement = document.createElement('div');
  addEventContainer.appendChild(descriptionDivElement);
  descriptionDivElement.className = "addDescription";

  let descriptionSpanElement = document.createElement('span');
  descriptionDivElement.appendChild(descriptionSpanElement);
  descriptionSpanElement.innerHTML = "Description";

  let descriptionInputElement = document.createElement('textarea');
  descriptionDivElement.appendChild(descriptionInputElement);
  descriptionInputElement.id = "description";
  descriptionInputElement.setAttribute("rows", rows);
  descriptionInputElement.setAttribute("wrap", "hard");
  if (readmode == "readonly") {
    descriptionInputElement.setAttribute("readonly", "");
  }
}