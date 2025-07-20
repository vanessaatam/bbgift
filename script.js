
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
    window.location.href = "second.html";
  }

});
document.getElementById("unlockButton").addEventListener("click", () => {
  if (!window.audioWindow || window.audioWindow.closed) {
    window.audioWindow = window.open(
      "audio.html",
      "audioWindow",
      "width=1,height=1"
    );
  }
  window.location.href = "second.html";
});



  