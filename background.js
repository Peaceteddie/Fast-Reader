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
  var readerBackground = document.querySelector("#reader");
  var isReading = readerBackground !== null;

  if (isReading) return;

  readerBackground = document.createElement("div");
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

  readerBackground.addEventListener("click", () => {
    abortSignal = true;
  });

  document.body.appendChild(readerBackground);

  var abortSignal;
  var words = selection.split(" ");

  await chrome.storage.sync.get(
    { speed: 250, interspeed: 50, semistop: 200, fullstop: 200 },
    async function (data) {
      readerBackground.innerText = words.shift();

      setTimeout(async () => {
        while (words.length > 0) {
          if (abortSignal) {
            return readerBackground.remove();
          }

          var word = words.shift();
          readerBackground.innerText = word;

          if (endsWith(word, [".", "?", "!", "]"])) {
            if (data.fullstop > 0)
              await new Promise((resolve) =>
                setTimeout(resolve, data.fullstop)
              );
          } else if (endsWith(word, [",", ";"])) {
            if (data.semistop > 0)
              await new Promise((resolve) =>
                setTimeout(resolve, data.semistop)
              );
          }

          await new Promise((resolve) => setTimeout(resolve, data.speed));

          word = "";
          readerBackground.innerText = word;

          if (data.interspeed > 0)
            await new Promise((resolve) =>
              setTimeout(resolve, data.interspeed)
            );
        }
        readerBackground.remove();
      }, 500);

      function endsWith(word, chars) {
        for (var i = 0; i < chars.length; i++) {
          if (word.endsWith(chars[i])) {
            return true;
          }
        }
        return false;
      }
    }
  );
}
