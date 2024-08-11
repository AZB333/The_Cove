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
                checkForHoliday(cell, date);
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

function checkForHoliday(cell, date){
    if(currentMonth == 0 && date == 1){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>A happy New Year to all ye scallywags!</p>`;
        cell.innerHTML += `<br><p class="event">New Year's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 0 && date == 15){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>A day to celebrate a great buccaneer!</p>`;
        cell.innerHTML += `<br><p class="event">Martin Luther King Jr. Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 1 && date == 14){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>If ye be single, you can ask yer parrot!</p>`;
        cell.innerHTML += `<br><p class="event">Valentine's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 1 && date == 19){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>I don't think pirates would celebrate a president</p>`;
        cell.innerHTML += `<br><p class="event">President's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 2 && date == 17){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Yarg! Curse these blasted leprechauns!</p>`;
        cell.innerHTML += `<br><p class="event">Saint Patrick's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 3 && date == 1){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Play a prank on ye first mate!</p>`;
        cell.innerHTML += `<br><p class="event">April Fool's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 3 && date == 15){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Yarg! Taxation is theft!</p>`;
        cell.innerHTML += `<br><p class="event">Tax Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 3 && date == 22){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Take some time to thank Mother Nature!</p>`;
        cell.innerHTML += `<br><p class="event">Earth Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 4 && date == 5){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Pirates love freedom and independence!</p>`;
        cell.innerHTML += `<br><p class="event">Cinco de Mayo</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 11 && date == 25){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Ho Ho Ho! Merry Christmas!</p>`;
        cell.innerHTML += `<br><p class="event">Christmas</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 4 && date == 27){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Remeber the soldiers in Davy Jone's Locker</p>`;
        cell.innerHTML += `<br><p class="event">Memorial Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 3 && date == 1){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Play a prank on ye first mate!</p>`;
        cell.innerHTML += `<br><p class="event">April Fool's Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 5 && date == 19){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Black shorty said im free, when we Lincoln?</p>`;
        cell.innerHTML += `<br><p class="event">Juneteenth</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 6 && date == 4){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Cheers to life, liberty, and the pursuit of treasure!</p>`;
        cell.innerHTML += `<br><p class="event">Independence Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 8 && date == 2){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Take a break from scrubbin the deck!</p>`;
        cell.innerHTML += `<br><p class="event">Labor Day</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 9 && date == 31){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Dress up as something fun, like a mermaid!</p>`;
        cell.innerHTML += `<br><p class="event">Halloween</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 10 && date == 2){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>Remember those resting in Davy Jone's Locker</p>`;
        cell.innerHTML += `<br><p class="event">Dia de los Muertos</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
    if(currentMonth == 11 && date == 31){
        let descriptionCell = document.createElement('div');
        descriptionCell.classList.add('hidden');
        descriptionCell.classList.add('description-cell');
        descriptionCell.innerHTML = `<p>I hope ye have yer resolutions written!</p>`;
        cell.innerHTML += `<br><p class="event">New Year's Eve</p>`
        cell.addEventListener('click', () => {
            descriptionCell.classList.toggle('hidden');
            cell.style.position = 'relative';
        });
        calendarBody.appendChild(descriptionCell);
    }
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
