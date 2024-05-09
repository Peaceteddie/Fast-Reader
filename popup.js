chrome.storage.sync.get("speed", (data) => {
  if (data.speed === undefined) {
    chrome.storage.sync.set({
      speed: 250,
      interspeed: 0,
      semistop: 300,
      fullstop: 400,
    });
  }
});

const GetSpeedText = (value) => "Word delay: " + value + "ms";

const GetInterspeedText = (value) => "Delay between words: " + value + "ms";

const GetSemistopText = (value) =>
  "Delay at comma or semicolon: " + value + "ms";

const GetFullstopText = (value) =>
  "Delay at the end of a sentence: " + value + "ms";

/////////////////////////////////////////////////////////////////////////////

function updateSpeed(value) {
  chrome.storage.sync.set({ speed: Number(value) }, () => {
    document.getElementById("speedText").innerText = GetSpeedText(value);
  });
}

function updateInterSpeed(value) {
  chrome.storage.sync.set({ interspeed: Number(value) }, () => {
    document.getElementById("interspeedText").innerText =
      GetInterspeedText(value);
  });
}

function updateSemistop(value) {
  chrome.storage.sync.set({ semistop: value }, () => {
    document.getElementById("semistopText").innerText = GetSemistopText(value);
  });
}

function updateFullstop(value) {
  chrome.storage.sync.set({ fullstop: value }, () => {
    document.getElementById("fullstopText").innerText = GetFullstopText(value);
  });
}

/////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get((data) => {
    document.getElementById("speed").value = data.speed;
    document.getElementById("speedText").innerText = GetSpeedText(data.speed);

    document.getElementById("interspeed").value = data.interspeed;
    document.getElementById("interspeedText").innerText = GetInterspeedText(
      data.interspeed
    );

    document.getElementById("semistop").value = data.semistop;
    document.getElementById("semistopText").innerText = GetSemistopText(
      data.semistop
    );

    document.getElementById("fullstop").value = data.fullstop;
    document.getElementById("fullstopText").innerText = GetFullstopText(
      data.fullstop
    );
  });
});

/////////////////////////////////////////////////////////////////////////////

document.getElementById("speed").addEventListener("input", (event) => {
  updateSpeed(event.target.value);
  event.preventDefault();
});

document.getElementById("interspeed").addEventListener("input", (event) => {
  updateInterSpeed(event.target.value);
  event.preventDefault();
});

document.getElementById("semistop").addEventListener("input", (event) => {
  updateSemistop(event.target.value);
  event.preventDefault();
});

document.getElementById("fullstop").addEventListener("input", (event) => {
  updateFullstop(event.target.value);
  event.preventDefault();
});

/////////////////////////////////////////////////////////////////////////////

document.getElementById("speed").addEventListener("change", (event) => {
  updateSpeed(event.target.value);
});

document.getElementById("interspeed").addEventListener("change", (event) => {
  updateInterSpeed(event.target.value);
});

document.getElementById("semistop").addEventListener("change", (event) => {
  updateSemistop(event.target.value);
});

document.getElementById("fullstop").addEventListener("change", (event) => {
  updateFullstop(event.target.value);
});
