
const grid = document.getElementById("grid");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next");

// 7 random gifts
const gifts = [
  {emoji: "🌸", message: "You Found a Flower 🌸<br>Happy Birthday Darling<br>May this flower fill your life with fragrance 😊"},
  {emoji: "🌱", message: "Here’s a little green friend 🌱<br>Happy Birthday Dear<br>May this plant bring you growth and positivity 😀"},
  {emoji: "🎈", message: "Catch this balloon! 🎈<br>Happy Birthday Cutie<br>May your life always be full of joy and fun 😉"},
  {emoji: "🧸", message: "A Teddy for my Teddie 🧸<br>Happy Birthday Teddie<br>May this teddy hug you with love even from afar 🤗"},
  {emoji: "🍫", message: "A sweet gift for my sweet girl 🍫<br>Happy Birthday Sweet Heart<br>May your days always be sweet 😋"},
  {emoji: "⭐", message: "Make a wish...You Found a Star ⭐<br>Happy Birthday Jaanu<br>May your life shine bright like stars 🤩"},
  {emoji: "💎", message: "A sparkling gem for you 💎<br>Happy Birthday Brave Girl<br>May your days shine bright 😘"}
];

// Heart is last
const heart = {emoji: "❤️", message: "Yeee…finally 😌 you found it 💖<br>Happiest Birthday Chokopieeeeee<br><br>My heart is with you now.<br>Please keep it safe until...<br>I come there and meet you ❤️🤗😘"};

let totalBoxes = gifts.length + 1; // 8 boxes total
let clickedCount = 0;
let revealed = [];

// Shuffle gifts
let shuffledGifts = gifts.sort(() => Math.random() - 0.5);

// Create empty cards
for (let i = 0; i < totalBoxes; i++) {
  const card = document.createElement("div");
  card.className = "card";
  card.textContent = "❓";
  grid.appendChild(card);
  revealed.push(false);

  card.addEventListener("click", () => {
    if (revealed[i]) return; // Already revealed

    clickedCount++;

    // Determine which item to show
    let item;
    if (clickedCount === totalBoxes) {
      item = heart; // Last click is heart
      card.classList.add("heart-glow");
      nextBtn.classList.remove("hidden");
    } else {
      const giftIndex = shuffledGifts.length - (totalBoxes - clickedCount);
      item = shuffledGifts[giftIndex];
    }

    // Reveal with pop animation
    card.textContent = item.emoji;
    card.classList.add("pop");
    setTimeout(() => card.classList.remove("pop"), 400);

    // Show message with heartbeat highlight
    result.innerHTML = `<span class="message-highlight">${item.message}</span>`;

    revealed[i] = true;
  });
}

function goToGift() {
  // Optional: fade out grid and result
  grid.classList.add("fade-out");
  result.classList.add("fade-out");
  nextBtn.classList.add("fade-out");

  // Wait for fade animation (800ms) then redirect
  setTimeout(() => {
    window.location.href = "cake.html"; // <-- replace with your actual gift page
  }, 800);
}
