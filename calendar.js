const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const today = document.getElementById("today-date");
const resetButton = document.getElementById("reset-btn")
const test= document.getElementById("test");
const currentDay = new Date().getDay();
const thisMonth = new Date().getMonth();
const thisYear = new Date().getFullYear();

const eventElements = []; //this will hold the events to use later
const events =[
    {
        date: '8/22/2024',
        title: "House Warming Party",
        description: "Join us for the first event hosted at The Cove!"
    },
]

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let currentDate = new Date().getDate();


function generateCalendar(year, month) {
    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Set month-year header
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    monthYear.textContent = `${monthNames[month]} ${year}`;
    today.textContent = `Today be ${dayNames[currentDay]} ${monthNames[thisMonth]} ${currentDate}th`;
    

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const eventFormat = `${currentMonth + 1}/${date}/${currentYear}`;
            const event = events.find(e => e.date == eventFormat);
            // test.textContent += `${eventFormat}/${event}/${currentYear}`;

            if (i === 0 && j < firstDay) {
                let cell = document.createElement('td');
                let cellText = document.createTextNode('');
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                let cell = document.createElement('td');
                cell.innerHTML += `<td>${date}</td>`;
                if (currentMonth == thisMonth && (currentDate == date) && thisYear == currentYear){
                    cell.classList.add("today");
                }
                if(event){
                    let descriptionCell = document.createElement('div');
                    descriptionCell.classList.add('hidden');
                    descriptionCell.classList.add('description-cell');
                    descriptionCell.innerHTML = `<p>${event.description}</p>`;
                    cell.innerHTML += `<br><p class="event">${event.title}</p>`
                    cell.addEventListener('click', () => {
                        descriptionCell.classList.toggle('hidden');
                        cell.style.position = 'relative';
                    });
                    calendarBody.appendChild(descriptionCell);
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
    resetButton.style.display = "flex";
    currentMonth = thisMonth;
    currentYear = thisYear;
    generateCalendar(currentYear, currentMonth);
});

// Initial Calendar Load
generateCalendar(currentYear, currentMonth);
