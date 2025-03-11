function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

let countdownInterval;
let remainingSeconds = 0;
let isPaused = false;

function startCountdown() {
    if (!isPaused) {
        let hours = parseInt(document.getElementById('hours').value, 10);
        let minutes = parseInt(document.getElementById('minutes').value, 10);
        remainingSeconds = (hours * 3600) + (minutes * 60);
    }
    isPaused = false;
    const clockElement = document.getElementById('clock');

    function updateCountdown() {
        if (remainingSeconds <= 0) {
            clearInterval(countdownInterval);
            clockElement.textContent = "00:00:00";
            return;
        }
        let h = Math.floor(remainingSeconds / 3600);
        let m = Math.floor((remainingSeconds % 3600) / 60);
        let s = remainingSeconds % 60;
        clockElement.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        remainingSeconds--;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function stopCountdown() {
    clearInterval(countdownInterval);
    isPaused = true;
}

let clockInterval = setInterval(updateClock, 1000);

document.getElementById('mode').addEventListener('change', function() {
    clearInterval(clockInterval);
    clearInterval(countdownInterval);
    document.getElementById('clock').textContent = "--:--:--";
    if (this.value === 'clock') {
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
        document.getElementById('countdown-settings').style.display = 'none';
    } else {
        document.getElementById('countdown-settings').style.display = 'block';
    }
});

document.getElementById('startCountdown').addEventListener('click', function() {
    clearInterval(countdownInterval);
    startCountdown();
});

document.getElementById('stopCountdown').addEventListener('click', function() {
    stopCountdown();
});

updateClock();