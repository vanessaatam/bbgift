

window.addEventListener("DOMContentLoaded", () => {
  

  const heading = document.getElementById("headingone");
  const container = document.querySelector(".sparkle-container");
  const buttonRow = document.getElementById("buttonRow");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const banquetImg = document.querySelector(".banquet");

  // ✅ Initial fade-in for heading + image
  setTimeout(() => {
    heading.classList.add("fadeIn");
    banquetImg.classList.add("fadeIn");
  }, 100);

  // ✅ Change heading text & show buttons with second fade
  setTimeout(() => {
    heading.classList.remove("fadeIn"); // reset animation
    void heading.offsetWidth; // trick to retrigger animation
    heading.textContent = "Wanna open some blind boxes?";
    heading.classList.add("fadeIn");

    buttonRow.classList.remove("hidden");
    buttonRow.classList.add("fadeIn");
  }, 3000);

  // ✨ Sparkle animation
  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.textContent = "\u2726";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${60 + Math.random() * 10}%`;
    sparkle.style.animationDuration = `${2 + Math.random() * 2}s`;
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 3000);
  }

  setInterval(createSparkle, 100);

  yesBtn.addEventListener("click", () => {
    setTimeout(() => {
      window.location.href = "surprise.html";
    }, 300);
  });
  

  noBtn.addEventListener("click", () => {
    alert("I'm not your BB");
  });
});
