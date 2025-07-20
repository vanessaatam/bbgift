
const mm = document.getElementById("mm");
const dd = document.getElementById("dd");
const yy = document.getElementById("yy");
const btn = document.getElementById("unlockBtn");

const acceptedCodes = ["07/18/25", "7/18/25"];

function normalize(val) {
  return val.padStart(2, "0");
}

function validate() {
  const code = `${normalize(mm.value)}/${normalize(dd.value)}/${normalize(yy.value)}`;
  btn.disabled = !acceptedCodes.includes(code);
}

[mm, dd, yy].forEach(input => input.addEventListener("input", validate));

btn.addEventListener("click", () => {
  const code = `${normalize(mm.value)}/${normalize(dd.value)}/${normalize(yy.value)}`;
  if (acceptedCodes.includes(code)) {
    // ✅ Open popup to play music
    if (!window.audioWindow || window.audioWindow.closed) {
      window.audioWindow = window.open(
        "audio.html",
        "audioWindow",
        "width=1,height=1"
      );
    }

    sessionStorage.setItem("audioAllowed", "true");

    // ✅ Navigate to next page
    window.location.href = "second.html";
  }
});



  