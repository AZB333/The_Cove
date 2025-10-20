const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const today = document.getElementById("today-date");
const resetButton = document.getElementById("reset-btn");

const currentDay = new Date().getDay();
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

let currentYear = thisYear;
let currentMonth = thisMonth;
let currentDate = new Date().getDate();

let holidayEvents = []; // loaded from JSON

document.addEventListener("DOMContentLoaded", () => {
  loadEventsAndRender();
});

function loadEventsAndRender() {
  fetch('/events.json')
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch events");
      return res.json();
    })
    .then(data => {
      holidayEvents = data;
      generateCalendar(currentYear, currentMonth); 
    })
    .catch(err => {
      console.error('Error loading events:', err);
      generateCalendar(currentYear, currentMonth); 
    });
}

// Function to check if a date matches a holiday in events.json
function checkForHoliday(month, day, year) {
  return holidayEvents.find(e => 
    e.month === month &&
    e.day === day &&
    (!e.year || e.year === year)
  ) || null;
}


function generateCalendar(year, month) {
  calendarBody.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  monthYear.textContent = `${monthNames[month]} ${year}`;
  today.textContent = `Today be ${dayNames[currentDay]} ${monthNames[thisMonth]} ${currentDate}th`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td');
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement('td');
        cell.textContent = date;

        // Highlight today
        if (currentMonth == thisMonth && date == currentDate && currentYear == thisYear) {
          cell.classList.add("today");
        }

        // Check for holidays / events
        const holiday = checkForHoliday(month, date, year);
        if (holiday) {
            cell.classList.add("holiday");
            cell.title = holiday.title; // hover text
            const eventTitle = document.createElement('div');
            eventTitle.classList.add('event');
            eventTitle.textContent = holiday.title;
            cell.appendChild(eventTitle);
            let descriptionCell = document.createElement('div');
            descriptionCell.classList.add('description-cell'); // make sure it has absolute positioning in CSS
            descriptionCell.innerHTML = `<p>${holiday.description}</p>`;
            
            // Insert the div inside the day cell, positioned above
            cell.appendChild(descriptionCell);

            // Add a click toggle
            cell.addEventListener('click', () => {
                descriptionCell.classList.toggle('visible'); // .visible in CSS makes it display:block
            });
        }
        row.appendChild(cell);
        date++;
      }
    }
    calendarBody.appendChild(row);
  }
}

function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
}

prevMonthButton.addEventListener('click', () => changeMonth(-1));
nextMonthButton.addEventListener('click', () => changeMonth(1));
resetButton.addEventListener('click', () => {
  currentMonth = thisMonth;
  currentYear = thisYear;
  generateCalendar(currentYear, currentMonth);
});
