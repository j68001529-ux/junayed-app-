console.log("Hello World!");

function showMessage() {
    alert("তুমি সফলভাবে বাটনে ক্লিক করেছো!");
}

function changeText() {
    const message = document.getElementById("message");
    if (message) {
        message.innerText = "Hello! Welcome to my app!";
    }
}

function changeColor() {
    document.body.style.background = "purple";
}

function resetColor() {
    document.body.style.background = "";
}

function showImage() {
    const image = document.querySelector(".image-card");
    if (image) {
        image.innerHTML =
            "<div>🌄 BEAUTIFUL VIEW<p>Welcome to my world</p></div>";
    }
}

// Clock
function updateClock() {
    const clock = document.getElementById("clock");
    if (!clock) return;

    clock.innerText = new Date().toLocaleTimeString("en-BD", {
        hour12: true
    });
}

setInterval(updateClock, 1000);
updateClock();

// Calendar
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

// Calculator
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
            } else if (value === "=") {
                try {
                    const expression = display.value;

                    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
                        throw new Error("Invalid expression");
                    }

                    display.value = Function(
                        '"use strict"; return (' + expression + ')'
                    )();
                } catch {
                    display.value = "Error";
                }
            } else {
                display.value += value;
            }
        };

        area.appendChild(button);
    });
}

// Stopwatch
let seconds = 0;
let stopwatchInterval = null;

function updateTimer() {
    const timer = document.getElementById("timer");
    if (!timer) return;

    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

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

// Theme
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Loader
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function() {
            loader.style.display = "none";
        }, 3000);
    }
});

// Notification
function showNotification() {
    const notice = document.getElementById("notification");
    const count = document.getElementById("notificationCount");
    const bell = document.getElementById("bellButton");

    if (!notice || !count || !bell) return;

    notice.innerText = "🎉 Welcome to Junayed APP!";
    notice.classList.add("show");

    count.innerText = "0";
    count.style.display = "none";

    bell.classList.add("read");

    setTimeout(function() {
        notice.classList.remove("show");
    }, 3000);
}

// Weather
function getWeather() {
    const locationText = document.getElementById("weatherLocation");
    const temperature = document.getElementById("temperature");
    const status = document.getElementById("weatherStatus");

    if (!locationText || !temperature || !status) return;

    locationText.innerText = "লোকেশন খোঁজা হচ্ছে...";
    status.innerText = "অপেক্ষা করো...";

    if (!navigator.geolocation) {
        locationText.innerText =
            "তোমার ব্রাউজার লোকেশন সমর্থন করে না।";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function(position) {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                const url =
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Weather API error");
                }

                const data = await response.json();

                if (!data.current) {
                    throw new Error("Weather data missing");
                }

                temperature.innerText =
                    data.current.temperature_2m + "°C";

                status.innerText =
                    "আবহাওয়ার কোড: " + data.current.weather_code;

                locationText.innerText =
                    "📍 তোমার বর্তমান অবস্থান";

            } catch (error) {
                status.innerText =
                    "আবহাওয়ার তথ্য পাওয়া যায়নি।";
            }
        },

        function(error) {
            locationText.innerText =
                "লোকেশন পাওয়া যায়নি। আবার চেষ্টা করো।";

            status.innerText =
                "Location error: " + error.message;
        },

        {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 60000
        }
    );
}
