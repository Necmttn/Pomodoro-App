

/*********************************
        TIMELINE EXTANSION
*********************************/

var $tl = $('#timeline');
var $tm = $('.analog');
var isDragging = false;
var oldPosX = 0;
var pixelPos = 0;
var timePos = 0;
var pixelWidth = 630;
var secondsWidth = 25;
var timeMultiplier = 1000 * 60;
var tickSound = new Howl({
        urls: ['http://reneroth.org/projects/codepen/pomodoro_tick.ogg', 'http://reneroth.org/projects/codepen/pomodoro_tick.mp3'],
        loop: true,
    volume:0.3
});
var turnSound = new Howl({
        urls: ['http://reneroth.org/projects/codepen/pomodoro_turn.ogg', 'http://reneroth.org/projects/codepen/pomodoro_turn.mp3']
});
var isTickPlaying = false;
var turnSoundDist = 25 / 2;
var ringSound = new Howl({
        urls: ['http://reneroth.org/projects/codepen/pomodoro_ring.ogg', 'http://reneroth.org/projects/codepen/pomodoro_ring.mp3'],
        volume: 1.0
});

function renderTime() {
        $tl.css('transform', 'translateX(-' + pixelPos + 'px)');
        $tl.css('-ms-transform', 'translateX(-' + pixelPos + 'px)');
        $tl.css('-moz-transform', 'translateX(-' + pixelPos + 'px)');
        $tl.css('-webkit-transform', 'translateX(-' + pixelPos + 'px)');
}
$tm.mousedown(function(e) {
        e.preventDefault();
        isDragging = true;
});
var lastTurnPos = 0;
$(document).mousemove(function(e) {
        e.preventDefault();
        if (isDragging) {
                var moveX = e.pageX - oldPosX;
                pixelPos -= moveX;
                pixelPos = Math.max(0, Math.min(pixelPos, pixelWidth));
                timePos = Math.ceil(pixelPos * secondsWidth / pixelWidth * timeMultiplier);
                renderTime();
                if (moveX > 0) {
                        lastTurnPos = e.pageX;
                }
                if (e.pageX - lastTurnPos < -turnSoundDist) {
                        if (pixelPos < pixelWidth) {
                                turnSound.play();
                        }
                        lastTurnPos = e.pageX;
                }
        } else {
                lastTurnPos = e.pageX;
        }
        oldPosX = e.pageX;
}).mouseup(function(e) {
        isDragging = false;
});

var lastTick = Date.now();

function doTick() {
        //requestAnimationFrame(doTick);
        setTimeout(doTick, 10); //setTimeout so the timer will continue running even if in the background
        var tickDuration = Date.now() - lastTick;
        lastTick = Date.now();
        if (isDragging || timePos <= 0) {
                if (isTickPlaying) {
                        tickSound.stop();
                        isTickPlaying = false;
                }
                return;
        }
        if (!isTickPlaying) {
                tickSound.play();
                isTickPlaying = true;
        }
        timePos -= tickDuration;
        timePos = Math.max(0, Math.min(timePos, secondsWidth * timeMultiplier));
        pixelPos = timePos / secondsWidth * pixelWidth / timeMultiplier;
        renderTime();
        if (timePos == 0) {
                wiggle($('.main'));
                ringSound.stop().play();
        }
}
doTick();

function wiggle(element) {

        /**************
            Rotation
        **************/
        TweenMax.fromTo(element, .07, {
                x: -4
        }, {
                x: 4,
                ease: Power1.easeInOut,
                yoyo: true,
                repeat: 21,
                onCompleteParams: [element],
                onComplete: resetWiggle
        });
}

function resetWiggle(element) {
        TweenMax.to(element, .05, {
                x: 0,
                ease: Power1.easeInOut
        });
}



/**********************************
    TIMELINE EXTANSION IS FINISH
**********************************/

var count, message, counter;

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
// Set the time , and message for  pomodoro 25min
function pomodoro() {
    clearInterval(counter);
    count = 90000;
    turnSound.play();
    // 90,000milisecond  = 25 min 
    document.getElementById("timer").innerHTML = "25:00:00";
    document.getElementById("start-pause").innerHTML = "Start";
    $('#start-pause').removeClass("hide");
    $('#pause').addClass('hide');
    $('.f-row2').addClass('hide');
    $('.f-row1').removeClass('hide');
}
// Set the time , and message for Short Rest 
function shortRest() {
    clearInterval(counter);
    count = 18000;
    turnSound.play();
    // 18,000milisecond = 5 min
    document.getElementById("timer").innerHTML = "05:00:00";
    document.getElementById("start-pause").innerHTML = "Start";
    $('#start-pause').removeClass("hide");
    $('#pause').addClass('hide');
    $('.f-row2').addClass('hide');
    $('.f-row1').removeClass('hide');
}
// Set the time , and message for long Rest 
function longRest() {
    clearInterval(counter);
    count = 54000;
    turnSound.play();
    // 54,000 milisecond = 15min
    document.getElementById("timer").innerHTML = "15:00:00";
    document.getElementById("start-pause").innerHTML = "Start";
    $('#start-pause').removeClass("hide");
    $('#pause').addClass('hide');
    $('.f-row2').addClass('hide');
    $('.f-row1').removeClass('hide');

}

function start() {
    countDown();
    document.getElementById("start-pause").innerHTML = "Start";
    tickSound.play();
    $('#start-pause').addClass("hide");
    $('#pause').removeClass('hide');
    $('.f-row2').addClass('hide');
}

function pause() {
    clearInterval(counter);
    tickSound.stop();
    document.getElementById("start-pause").innerHTML = "Contuine";
    $('#start-pause').removeClass("hide");
    $('#pause').addClass('hide');
}

function reset() {
    document.getElementById("timer").innerHTML = "00:00:00";
    count = 0;
    tickSound.stop();
    clearInterval(counter);
    document.getElementById("start-pause").innerHTML = "Start";
    $('.f-row2').removeClass('hide');
    $('.f-row1').addClass('hide');
}

function countDown() {
    if (counter) {
        clearTimeout(counter);
    }
    counter = setInterval(timer, 10);

    function timer() {
        count = count - 1;
        var miliSeconds = Math.floor(count % 60)
        var seconds = Math.floor(count / 60 % 60);
        var minutes = Math.floor(count / 3600 % 60);
        if (count <= 0) {
            clearInterval(counter);
            // when count is finish send Log
            document.getElementById("timer").innerHTML = "finished";
            return;
        }
        console.log(count);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        miliSeconds = checkTime(miliSeconds);
        document.getElementById("timer").innerHTML = minutes + ":" + seconds + ":" + miliSeconds;
    }
}


function digital(){
    $('.analog').addClass('hide')
    $('.pomodoro').removeClass('hide')
}
function analog(){
    $('.pomodoro').addClass('hide')
    $('.analog').removeClass('hide')
}

