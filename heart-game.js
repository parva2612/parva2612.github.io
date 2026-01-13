const grid = document.getElementById("grid");
const result = document.getElementById("result");

const totalCards = 6;
const heartIndex = Math.floor(Math.random() * totalCards);
let gameOver = false;

// Create cards
for (let i = 0; i < totalCards; i++) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerText = "❓";

  card.addEventListener("click", () => {
    if (gameOver) return;

    if (i === heartIndex) {
      card.innerText = "❤️";
      result.innerText = "You found it. My heart is yours 💖";
      gameOver = true;
    } else {
      card.innerText = "💔";
    }
  });

  grid.appendChild(card);
}
