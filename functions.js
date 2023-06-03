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
  showCalendarMonth();
  addNewTask(9, 5, 2023);
  fillNewForm("ok", "lol", "10:00", "11:00");
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
  }
}

function newPlan(date, month, year, type) {
  let popupContainer = document.getElementById("popupContainer");
  popupContainer.innerHTML = "";
  popupContainer.className = "addEventPopupShown";

  let addEventContainer = document.createElement('div');
  popupContainer.appendChild(addEventContainer);
  addEventContainer.id = "addEventContainer";

  let cancelNewPlanBtn = document.createElement('button');
  addEventContainer.appendChild(cancelNewPlanBtn);
  cancelNewPlanBtn.className = "closeNewEvent";
  cancelNewPlanBtn.setAttribute("onclick", 'cancelNewPlan()');
  for(let i = 0; i < 2; i++) {
    let divCloseNewPlan = document.createElement('div');
    cancelNewPlanBtn.appendChild(divCloseNewPlan);
  }

  if(type == "Class" || type == "Personal event" || type == undefined) {
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

    let descriptionDivElement = document.createElement('div');
    addEventContainer.appendChild(descriptionDivElement);
    descriptionDivElement.className = "addDescription";

    let descriptionSpanElement = document.createElement('span');
    descriptionDivElement.appendChild(descriptionSpanElement);
    descriptionSpanElement.innerHTML = "Description";

    let descriptionInputElement = document.createElement('textarea');
    descriptionDivElement.appendChild(descriptionInputElement);
    descriptionInputElement.id = "description";
    descriptionInputElement.setAttribute("rows", "14");
    descriptionInputElement.setAttribute("wrap", "hard");

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
function fillNewForm(titleValue, descriptionValue, startTimeValue, endTimeValue) {
  document.getElementById("title").value = titleValue;
  document.getElementById("description").value = descriptionValue;
  document.getElementById("startTime").value = startTimeValue;
  document.getElementById("endTime").value = endTimeValue;
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

  let cancelNewPlanBtn = document.createElement('button');
  addEventContainer.appendChild(cancelNewPlanBtn);
  cancelNewPlanBtn.className = "closeNewEvent";
  cancelNewPlanBtn.setAttribute("onclick", 'cancelNewPlan()');
  for(let i = 0; i < 2; i++) {
    let divCloseNewPlan = document.createElement('div');
    cancelNewPlanBtn.appendChild(divCloseNewPlan);
  }
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
  let descriptionDivElement = document.createElement('div');
  addEventContainer.appendChild(descriptionDivElement);
  descriptionDivElement.className = "addDescription";

  let descriptionSpanElement = document.createElement('span');
  descriptionDivElement.appendChild(descriptionSpanElement);
  descriptionSpanElement.innerHTML = "Description";

  let descriptionInputElement = document.createElement('textarea');
  descriptionDivElement.appendChild(descriptionInputElement);
  descriptionInputElement.id = "description";
  descriptionInputElement.setAttribute("rows", "16");
  descriptionInputElement.setAttribute("wrap", "hard");

  let timeDivElement = document.createElement('div');
  addEventContainer.appendChild(timeDivElement);
  timeDivElement.className = "addTimeStamps";

  let timeNeededSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeNeededSpanElement);
  timeNeededSpanElement.innerHTML = "Hours needed";

  let timeStartInputElement = document.createElement('input');
  timeDivElement.appendChild(timeStartInputElement);
  timeStartInputElement.id = "startTime";
  timeStartInputElement.setAttribute("type", "number");

  let timeStopSpanElement = document.createElement('span');
  timeDivElement.appendChild(timeStopSpanElement);
  timeStopSpanElement.innerHTML = "End time";

  let timeStopInputElement = document.createElement('input');
  timeDivElement.appendChild(timeStopInputElement);
  timeStopInputElement.id = "endTime";
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
  createEventBtn.setAttribute("onclick", 'addEventToDatabase()');
  addEventContainer.appendChild(createEventBtn);
  fillNewForm(titleValue, descriptionValue, startTimeValue, endTimeValue);
}