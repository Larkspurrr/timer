let inputs = Array.from(document.getElementsByClassName("input"));
let hours = document.getElementById("hours");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");

let startNstop = document.getElementById("startNstop");
let clear = document.getElementById("clear");

let timerInterval, timerDoneInterval, i;
let isActive = false;
let doneCounter = 0;


inputs.map(input => {
    input.addEventListener("input", () => {
        let v = parseInt(input.value);
        if (v < 0) input.value = 0;
        if (v > 59) input.value = 59;
    })
})

function timerDone() {
    doneCounter += 1;
    if (doneCounter % 2 == 1) {
        for (i = 0; i < inputs.length; i++) {
            inputs[i].style.color = "red";
        }
    } else if (doneCounter % 2 == 0) {
        for (i = 0; i < inputs.length; i++) {
            inputs[i].style.color = "#e8eef1";
        }
    }
}

function canActivate() {
    if (isActive == true) {
        hours.disabled = true;
        minutes.disabled = true;
        seconds.disabled = true;
    } else if (isActive == false) {
        hours.disabled = false;
        minutes.disabled = false;
        seconds.disabled = false;
    }
}


function begin() {
    if (hours.value == 0 && minutes.value == 0 && seconds.value == 0) {
        clearInterval(timerInterval);
        timerDoneInterval = setInterval(timerDone, 1000);
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


startNstop.addEventListener("click", () => {
    if (isActive == false) {
        inputs.forEach(function(input) {
            if (input.value == "") input.value = 0;
        })
        timerInterval = setInterval(begin, 1000);
        canActivate();
        startNstop.innerHTML = "Stop";
        isActive = true;
    } else if (isActive == true) {
        isActive = false;
        canActivate();
        clearInterval(timerInterval);
        clearInterval(timerDoneInterval);
        for (i = 0; i < inputs.length; i++) {
            inputs[i].style.color = "#e8eef1";
        }
        startNstop.innerHTML = "Start";
    }
})

clear.addEventListener("click", () => {
    isActive = false;
    canActivate();
    clearInterval(timerInterval);
    clearInterval(timerDoneInterval);
    for (i = 0; i < inputs.length; i++) {
        inputs[i].style.color = "#e8eef1";
    }
    hours.value = 0;
    minutes.value = 0;
    seconds.value = 0;
})
