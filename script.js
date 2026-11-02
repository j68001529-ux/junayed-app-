console.log("JUNAYED APP Started!");

// QUICK TOOLS

function showMessage() {
    alert("তুমি সফলভাবে বাটনে ক্লিক করেছো!");
}

function changeText() {
    const message = document.getElementById("message");

    if (message) {
        message.innerText = "✨ Hello! Welcome to JUNAYED APP!";
    }
}

function changeColor() {
    document.body.style.background =
        "linear-gradient(135deg, #24113d, #090909)";
}

function resetColor() {
    document.body.style.background = "";
}

// IMAGE CARD

function showImage() {
    const image = document.querySelector(".image-card");

    if (image) {
        image.innerHTML =
            "<div><h2>🌄 BEAUTIFUL VIEW</h2><p>Welcome to my world</p></div>";
    }
}

// CLOCK

function updateClock() {
    const clock = document.getElementById("clock");

    if (!clock) return;

    clock.innerText = new Date().toLocaleTimeString("en-BD", {
        hour12: true
    });
}

updateClock();
setInterval(updateClock, 1000);

// CALENDAR

function updateCalendar() {
    const calendar = document.getElementById("calendar");

    if (!calendar) return;

    calendar.innerText = new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

updateCalendar();

// CALCULATOR

const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "C", "0", "=", "+"
];
const area = document.getElementById("buttons");

if (area) {
    buttons.forEach(function(value) {
        const button = document.createElement("button");

        button.innerText = value;

        button.onclick = function() {
            const display = document.getElementById("display");

            if (!display) return;

            if (value === "C") {
                display.value = "";
            }

            else if (value === "=") {
                try {
                    const expression = display.value;

                    if (
                        !expression ||
                        !/^[0-9+\-*/().\s]+$/.test(expression)
                    ) {
                        throw new Error("Invalid expression");
                    }

                    const result = Function(
                        '"use strict"; return (' + expression + ')'
                    )();

                    if (!Number.isFinite(result)) {
                        throw new Error("Invalid result");
                    }

                    display.value = result;

                } catch {
                    display.value = "Error";
                }
            }

            else {
                if (display.value === "Error") {
                    display.value = "";
                }

                display.value += value;
            }
        };

        area.appendChild(button);
    });
}

// STOPWATCH

let seconds = 0;
let stopwatchInterval = null;

function updateTimer() {
    const timer = document.getElementById("timer");

    if (!timer) return;

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    timer.innerText =
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");
}

function startTimer() {
    if (stopwatchInterval !== null) return;

    stopwatchInterval = setInterval(function() {
        seconds++;
        updateTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}

function resetTimer() {
    stopTimer();
    seconds = 0;
    updateTimer();
}

updateTimer();

// THEME

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

// LOADING SCREEN

window.addEventListener("load", function() {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function() {
            loader.classList.add("hide");
        }, 1800);
    }
});

// NOTIFICATION

function showNotification() {
    const notice = document.getElementById("notification");
    const count = document.getElementById("notificationCount");

    if (!notice || !count) return;

    notice.innerText = "🎉 Welcome to JUNAYED APP!";
    notice.classList.add("show");

    count.innerText = "0";
    count.style.display = "none";

    setTimeout(function() {
        notice.classList.remove("show");
    }, 3000);
}

// WEATHER

function getWeather() {
    const locationText =
        document.getElementById("weatherLocation");

    const temperature =
        document.getElementById("temperature");

    const status =
        document.getElementById("weatherStatus");

    if (!locationText || !temperature || !status) return;

    locationText.innerText = "মনপুরা, ভোলার আবহাওয়া";
    status.innerText = "আবহাওয়ার তথ্য আনা হচ্ছে...";
    temperature.innerText = "--°C";

    const lat = 22.30;
    const lon = 90.97;

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=Asia%2FDhaka`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Weather error");
            }

            return response.json();
        })
        .then(function(data) {
            temperature.innerText =
                data.current.temperature_2m + "°C";

            const code = data.current.weather_code;

            if (code === 0) {
                status.innerText = "☀️ পরিষ্কার আকাশ";
            } else if ([1, 2, 3].includes(code)) {
                status.innerText = "🌤️ আংশিক মেঘলা";
            } else if ([45, 48].includes(code)) {
                status.innerText = "🌫️ কুয়াশা";
            } else if ([51, 53, 55, 61, 63, 65].includes(code)) {
                status.innerText = "🌧️ বৃষ্টি";
            } else if ([95, 96, 99].includes(code)) {
                status.innerText = "⛈️ বজ্রসহ বৃষ্টি";
            } else {
                status.innerText = "আবহাওয়ার তথ্য পাওয়া গেছে";
            }
        })
        .catch(function() {
            status.innerText =
                "আবহাওয়ার তথ্য পাওয়া যায়নি। আবার চেষ্টা করো।";
        });
                       }
