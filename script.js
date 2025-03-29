const pomodoroContainer = document.getElementById("pomodoro-container");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const alarmTone = new Audio("media/ringtone.mp3");
const timeCompleted = document.getElementById("timeCompleted");


let initialTime = 3; // 25 minutes in seconds 
let timeLeft = initialTime; // 25 minutes in seconds
let isPaused = true; // initially the timer is paused
let intervalId; // to store the interval id


// format the time
startBtn.addEventListener("click", () => {
    if (isPaused) {
        startTimer();
    }
});


// pause the timer
pauseBtn.addEventListener("click", () => {
    if (!isPaused) {
        clearInterval(intervalId);
        isPaused = true;
    }
});

// reset the timer
resetBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    isPaused = true;
    timeLeft = initialTime;
    timer.textContent = formatTime(timeLeft);
});



// start the time
function startTimer() {

    if(timeLeft === 0){  // if the time is 0, reset the time
        timeLeft = initialTime;
    }
    isPaused = false;
    intervalId = setInterval(() => {
        timeLeft--;
        timer.textContent = formatTime(timeLeft);
        if (timeLeft === 0) {
            clearInterval(intervalId);
            isPaused = true;
            alarmTone.play();;
            timeCompleted.textContent = "Time's up! Great job! 🎉";
            timeCompleted.style.color = "white";
        }
    }, 1000);
}

// format the time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// display the time
timer.textContent = formatTime(timeLeft);



