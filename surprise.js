
window.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("backgroundAudio");

  // Only play after user interacted once
  if (sessionStorage.getItem("audioAllowed")) {
    audio.play().catch(() => {}); // Ignore autoplay errors silently
  } else {
    // Wait for first user interaction
    const yesBtn = document.getElementById("yesBtn") || document.body;
    yesBtn.addEventListener("click", () => {
      sessionStorage.setItem("audioAllowed", "true");
      audio.play().catch(() => {});
    }, { once: true });
  }
  // if (!window.audioWindow || window.audioWindow.closed) {
  //   window.audioWindow = window.open("audio.html", "audioWindow", "width=1,height=1");
  // }
  
  const phrases = [
    "Welcome to BB's Blind Boxes!",
    "also known as BBBB",
    "or as Quadruple B",
    "or as B^4",
    "or as B to the B to the B to the B",
    "Anywho, let's get started shall we?",
    "In a moment, you'll see a few 'BBBB's' that you can pick from",
    "Pick one to see what new BB foto(s) you win",
    "Good luck soldier!"
  ];

  const typeTarget = document.getElementById("typewriter");
  const imageGrid = document.querySelector(".image-grid");
  const endMessage = document.getElementById("end-typewriter");
  const endPrize = document.getElementById("end-image");
  const finalReveal = document.getElementById("final-reveal");

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeIntro() {
    const currentPhrase = phrases[phraseIndex];
    const currentText = currentPhrase.substring(0, letterIndex);
    typeTarget.textContent = currentText;

    if (!isDeleting && letterIndex < currentPhrase.length) {
      letterIndex++;
      setTimeout(typeIntro, 75);
    } else if (isDeleting && letterIndex > 0) {
      letterIndex--;
      setTimeout(typeIntro, 35);
    } else {
      if (!isDeleting) {
        isDeleting = true;
        setTimeout(typeIntro, 1000);
      } else {
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex >= phrases.length) {
          typeTarget.style.display = "none";
          imageGrid.style.display = "block";
          imageGrid.classList.add("fade-in");
          setupImageClickHandlers();
          return;
        }
        setTimeout(typeIntro, 500);
      }
    }
  }

  typeIntro();

  function setupImageClickHandlers() {
    const imageMap = {
      1: "me1.png",
      2: "me2.JPG",
      3: "me3.JPG",
      4: "me4.png",
      5: "me5.png",
      6: "me6.png",
      7: "me7.png",
      8: "me8.JPG"
    };

    const images = document.querySelectorAll(".image-grid img");
    const modalImage = document.getElementById("modalImage");
    const modalEl = document.getElementById("imageModal");
    const bootstrapModal = new bootstrap.Modal(modalEl);
    const clickedSet = new Set();

    images.forEach((img) => {
      img.addEventListener("click", () => {
        const index = img.getAttribute("data-index");
        const meImageSrc = imageMap[index];

        if (meImageSrc) {
          modalImage.src = meImageSrc;
          img.style.visibility = "hidden";
          bootstrapModal.show();

          clickedSet.add(index);

          modalEl.addEventListener("hidden.bs.modal", () => {
            if (clickedSet.size === images.length) {
              setTimeout(() => {
                finalReveal.classList.remove("hidden");
typeFinalMessage("Hehe, hope you enjoyed your prizes! I wuv you <3");
endPrize.classList.remove("hidden");
spawnFloatingHearts(); // 🎉 hearts come out

              }, 500);
            }
          }, { once: true });
        }
      });
    });
  }

  function typeFinalMessage(text) {
    let i = 0;
    function write() {
      endMessage.textContent = text.substring(0, i);
      if (i < text.length) {
        i++;  // Correct variable to increment
        setTimeout(write, 75);  // Call the same function again, not typeFinalMessage
      }
    }
    write();
  }
  function spawnFloatingHearts() {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💚";
  
      // Random horizontal start position
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "60%"; // around the final-reveal position
  
      document.body.appendChild(heart);
  
      // Remove after animation completes
      setTimeout(() => heart.remove(), 2000);
    }, 200);
  
    // Stop after 3 seconds
    setTimeout(() => clearInterval(interval), 10000);
  }
  
});

