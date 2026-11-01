        } else {
            display.value += value;
        }
    };

    area.appendChild(button);
});
let seconds = 0;
let stopwatchInterval = null;

function updateTimer() {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    document.getElementById("timer").innerText =
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
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
window.addEventListener("load", function() {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(function() {
            loader.style.display = "none";
        }, 3000);
    }
});
let notificationNumber = 1;


function showNotification() {
    const notice = document.getElementById("notification");
    const count = document.getElementById("notificationCount");
    const bell = document.getElementById("bellButton");

    notice.innerText = "🎉 Welcome to Junayed APP!";
    notice.classList.add("show");

    count.innerText = "0";
    count.style.display = "none";

    bell.classList.add("read");

    setTimeout(function() {
        notice.classList.remove("show");
    }, 3000);
}
function getWeather() {
  
    const locationText = document.getElementById("weatherLocation");
    const temperature = document.getElementById("temperature");
    const status = document.getElementById("weatherStatus");

    locationText.innerText = "লোকেশন খোঁজা হচ্ছে...";
    status.innerText = "অপেক্ষা করো...";

    if (!navigator.geolocation) {
        locationText.innerText = "তোমার ব্রাউজার লোকেশন সমর্থন করে না।";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async function(position) {
          alert("Location Found!");
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
                status.innerText = "আবহাওয়ার তথ্য পাওয়া যায়নি।";
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
