chrome.contextMenus.create({
  id: "speedread",
  title: "Speedread",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "speedread") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: Speedread,
      args: [info.selectionText],
    });
  }
});

async function Speedread(selection) {
  function createReaderBackground() {
    const readerBackground = document.createElement("div");
    readerBackground.style.placeContent = "center";
    readerBackground.style.placeItems = "center";
    readerBackground.style.background = "#000c";
    readerBackground.style.position = "fixed";
    readerBackground.style.fontSize = "6rem";
    readerBackground.style.display = "flex";
    readerBackground.style.height = "100%";
    readerBackground.style.color = "#fff";
    readerBackground.style.width = "100%";
    readerBackground.style.inset = "0";
    readerBackground.style.zIndex = "1000";
    readerBackground.id = "reader";
    return readerBackground;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let readerBackground = document.querySelector("#reader");
  const isReading = readerBackground !== null;
  console.log("Speedread: " + selection);

  if (isReading) return;

  readerBackground = createReaderBackground();

  let abortSignal = false;
  readerBackground.addEventListener("click", () => {
    abortSignal = true;
  });

  document.body.appendChild(readerBackground);

  const words = selection.split(/\s+/);

  await chrome.storage.sync.get(async function (data) {
    for (let word of words) {
      if (abortSignal) {
        readerBackground.remove();
        return;
      }

      readerBackground.innerText = word;

      if (word.endsWith(".") || word.endsWith("!") || word.endsWith("?")) {
        if (data.fullstop > 0) await wait(data.fullstop);
      } else if (
        word.endsWith(",") ||
        word.endsWith(";") ||
        word.endsWith(":")
      ) {
        if (data.semistop > 0) await wait(data.semistop);
      }

      await wait(data.speed);

      readerBackground.innerText = "";

      if (data.interspeed > 0) await wait(data.interspeed);
    }
    readerBackground.remove();
  });
}
