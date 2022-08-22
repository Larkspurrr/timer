let inputs = Array.from(document.getElementsByClassName("input"));
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let start = document.getElementById("start");
let stop = document.getElementById("stop");
let clear = document.getElementById("clear");

let timerInterval, timerDoneInterval, isActive;


inputs.map(input => {
    input.addEventListener("input", () => {
        let v = parseInt(input.value);
        if (v < 0) input.value = 0;
        if (v > 59) input.value = 59;
    })
})

function doneMenu() {
    let chosenColor = Math.floor(Math.random() * 2);
    if (chosenColor == 0) {
        hours.style.color = "red";
        minutes.style.color = "red";
        seconds.style.color = "red";
    } else {
        hours.style.color = "#e8eef1";
        minutes.style.color = "#e8eef1";
        seconds.style.color = "#e8eef1";
    }
}

function canActivate() {
    if (isActive == true) {
        start.disabled = true;
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
    } else if (isActive == false) {
        start.disabled = false;
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
    }
}


function begin() {
    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        clearInterval(timerInterval);
        timerDoneInterval = setInterval(doneMenu, 1000);
    } else if (hours.value == 0 && minutes.value >= 0 && seconds.value > 0) {
        seconds.value -= 1;
    } else if (hours.value > 0 && minutes.value == 0 && seconds.value == 0) {
        minutes.value = 59;
        seconds.value = 59;
        hours.value -= 1;
    } else {
        seconds.value -= 1;
        if (minutes.value == -1 && hours.value > 0) {
            hours.value -= 1;
            minutes.value = 59;
        } else if (minutes.value == -1){
            minutes.value = 59;
        }

        if (seconds.value < 0){
            minutes.value -= 1;
            seconds.value = 59;
        }
    }
}


start.addEventListener("click", () => {
    timerInterval = setInterval(begin, 1000);
    isActive = true;
    canActivate();
})

stop.addEventListener("click", () => {
    isActive = false;
    canActivate();
    clearInterval(timerInterval);
})

clear.addEventListener("click", () => {
    isActive = false;
    canActivate();
    clearInterval(timerInterval);
    clearInterval(timerDoneInterval);
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
})
