// function timer(seconds) {
//     setInterval(function() {
//         seconds--;
//     })
// }

// this does not work because setInterval is weird
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    //here we are running a function that shows us how much time until 'then' 
    // which is where the function ends
    displayEndTime(then);

    countdown = setInterval(() => {
        // we round it for ms lag
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        
        // this stops the countdown but setInterval continues running;
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    // we need floor because we only the full minute number
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // remember to fix for the below 10 second digits
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    //we create a new Date from the milisseconds since epoch
    const end = new Date(timestamp);
    // here we created the 'end date' with the timestamp and we capture the hour and minutes of that end date
    // so we can add it to the endTime text content;
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour -12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    // so we can access the data set object with the time property
    console.log(this.dataset.time);
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
    // gotta be careful here because we will 'add another timer' above the other
    // we 'queue' up all the timers at once
}

buttons.forEach(button => button.addEventListener('click', startTimer));

// here a trick, if we do 'document.input-name' we can get the input

document.customForm.addEventListener('submit', function(e) {
    // to prevent the 'submit effect'
    e.preventDefault(); 
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
})

// this was very interesting project

