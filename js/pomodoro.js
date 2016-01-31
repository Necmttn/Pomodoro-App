function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function pomodoro() {
    count = 1500;
    message = "You just finished you're Pomodoro";
    countDown();
}

function shortRest() {
    count = 300;
    message = "You just finished you're Short Rest";
    countDown();
}

function longRest() {
    count = 900;
    message = "You just finished you're Long Rest";
    countDown();
}
var count = 300;
function countDown() {
	
    
    counter = setInterval(timer, 1000);

    function timer() {
        count = count - 1;
        var seconds = Math.floor(count % 60);
        var minutes = Math.floor(count / 60);
        if (count <= 0) {
            clearInterval(counter);
            // when count is finish send Log
            document.getElementById("timer").innerHTML = message;
            return;
        }
        console.log(count);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        document.getElementById("timer").innerHTML = minutes + ":" + seconds + " secs";
    }
}