function() {
    var count, message, counter;

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
// Set the time , and message for  pomodoro 25min
    function pomodoro() {
        count = 1500;
        message = "You just finished you're Pomodoro";
        countDown();
    }
// Set the time , and message for Short Rest 
    function shortRest() {
        count = 300;
        message = "You just finished you're Short Rest";
        countDown();
    }
// Set the time , and message for long Rest 
    function longRest() {
        count = 900;
        message = "You just finished you're Long Rest";
        countDown();
    }

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
}