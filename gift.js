// 1️⃣ Dynamically insert message
document.getElementById("giftText").innerHTML = `
  <h2>Happy Birthday<br>My Chokopieee ❤️❤️❤️</h2>
`;

// 2️⃣ Fade-in video after 1s
const video = document.getElementById("giftVideo");
setTimeout(() => {
  video.style.opacity = 1;
  video.play();
}, 1000);

// 3️⃣ Floating hearts effect
const heartsContainer = document.getElementById("hearts-container");

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 90 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 2) + "s";
  heartsContainer.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => heart.remove(), 5000);
}

// Create hearts periodically
setInterval(createHeart, 500); // one heart every 0.5s
