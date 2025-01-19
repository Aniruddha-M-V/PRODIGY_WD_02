let startTime;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let laps = [];

function updateTime() {
  if (isRunning) {
    elapsedTime = Date.now() - startTime;

    const milliseconds = Math.floor(elapsedTime % 1000);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor(elapsedTime / (60 * 1000));

    const min = minutes.toString().padStart(2, "0");
    const sec = seconds.toString().padStart(2, "0");
    const msec = milliseconds.toString().padStart(3, "0").slice(0, 2);

    document.querySelector(".min").textContent = min;
    document.querySelector(".sec").textContent = `:${sec}`;
    document.querySelector(".msec").textContent = `:${msec}`;
  }
}

function startStopwatch() {
  if (isRunning) {
    clearInterval(intervalId);
    document.getElementById("startBtn").querySelector(".text").innerHTML =
      '<i class="fa-solid fa-play fa-lg"></i>';
  } else {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    document.getElementById("startBtn").querySelector(".text").innerHTML =
      '<i class="fa-solid fa-pause fa-lg"></i>';
  }
  isRunning = !isRunning;
}

function resetStopwatch() {
  clearInterval(intervalId);
  startTime = null;
  elapsedTime = 0;
  document.querySelector(".min").textContent = "00";
  document.querySelector(".sec").textContent = ":00";
  document.querySelector(".msec").textContent = ":00";
  laps = [];
  document.querySelector(".laps").innerHTML = "<p></p>";
  isRunning = false;
  document.getElementById("startBtn").querySelector(".text").innerHTML =
    '<i class="fa-solid fa-play fa-lg"></i>';
}

function lapStopwatch() {
  if (isRunning) {
    const min = document.querySelector(".min").textContent;
    const sec = document.querySelector(".sec").textContent;
    const msec = document.querySelector(".msec").textContent;
    const lapTime = `${min}${sec}${msec}`;
    laps.push(lapTime);
    updateLaps();
  }
}

function updateLaps() {
  const lapsList = document.querySelector(".laps");
  lapsList.innerHTML = "";

  laps.forEach((lap, index) => {
    const lapElement = document.createElement("p");
    lapElement.textContent = `Lap ${index + 1}: ${lap}`;
    lapsList.appendChild(lapElement);
  });
}
document.getElementById("startBtn").addEventListener("click", startStopwatch);
document.querySelector(".btn[name='reset']").addEventListener("click", resetStopwatch);
document.querySelector(".btn[name='lap']").addEventListener("click", lapStopwatch);
