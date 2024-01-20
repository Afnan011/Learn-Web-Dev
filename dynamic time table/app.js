const currentDateElement = document.getElementById("currentDate");
const timetableContainer = document.getElementById("timetableContainer");

// Sample data
const subjectsPerDay = {
  day1: [
    { time: "9:00 AM", subject: "Math" },
    { time: "10:00 AM", subject: "History" },
  ],
  // Add more days and corresponding subjects
};

const datesToDaysMapping = {
    "day1": ["20-01-2024", "25-01-2024", /*...*/],
    // Add more days and corresponding dates
};


const holidays = [
  { "01-01-2024": "New Year's Day" },
  { "26-01-2024": "Republic Day" },
];



function isHoliday(date) {
  const matchingHoliday = holidays.find((holiday) => date in holiday);
  return matchingHoliday ? matchingHoliday[date] : null;
}

function getDayFromDate(date) {
    for (const [day, dates] of Object.entries(datesToDaysMapping)) {
        if (dates.includes(date)) {
            return day;
        }
    }
    return null; // Return null if the date is not found in any day
}


function displayTimetable() {
  // const today = new Date().toLocaleDateString("en-GB").replace(/\//g, '-');
  const today = "25-01-2024";

  currentDateElement.innerText = `Today's Date: ${today}`;

  const isHolidayToday = isHoliday(today);
  if (isHolidayToday) {
    timetableContainer.textContent = `Today is a holiday: ${isHolidayToday}`;
    return;
  }

  const todayDay = getDayFromDate(today);
  const todaySubjects = subjectsPerDay[todayDay];

  if (todaySubjects) {
    // Display timetable
    // You can create a table or format it as per your preference
    const timetableTable = document.createElement("table");
    todaySubjects.forEach((item) => {
      const row = timetableTable.insertRow();
      row.insertCell(0).textContent = item.time;
      row.insertCell(1).textContent = item.subject;
    });
    timetableContainer.appendChild(timetableTable);
  } else {
    timetableContainer.textContent += "No timetable for today.";
  }
}

// Call the function to display the timetable
displayTimetable();
