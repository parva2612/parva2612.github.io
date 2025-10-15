// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

function validateForm() {
  const message = document.getElementById('message');
  if (message.value.trim().length < 20) {
    alert("Message must be at least 20 characters long.");
    message.focus();
    return false;
  }
  return true;
}


// ===== Floating Objects Background =====
const canvas = document.getElementById("floatingBackground");
const ctx = canvas.getContext("2d");
let floatingObjects = [];
let images = [];
let numObjects = 20; // total number of floating items
const folder = "elements/";

// Automatically load filenames based on pattern
const suffixes = [
  "green_christmas_1", "green_christmas_2", "red_christmas_1", "red_christmas_2",
//   "green_1", "red_christmas_2"
];

// Create image list
// images = suffixes.map(s => `${folder}floating_object_${s}.png`);
images = suffixes.map(s => `${folder}floating_object_${s}.jpg`);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class FloatingItem {
  constructor(img) {
    this.img = img;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 30 + Math.random() * 50;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    // this.rotation = Math.random() * Math.PI * 2;
    // this.rotationSpeed = (Math.random() - 0.5) * 0.001;
    this.rotation = Math.random() * Math.PI * 0;
    this.rotationSpeed = (Math.random() - 0.5) * 0;
    this.opacity = 0.2 + Math.random() * 0.7;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    // Wrap around screen edges
    if (this.x < -this.size) this.x = canvas.width + this.size;
    if (this.x > canvas.width + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = canvas.height + this.size;
    if (this.y > canvas.height + this.size) this.y = -this.size;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

// ctx.fillStyle = "lime";
// ctx.font = "24px monospace";
// ctx.fillText("Canvas Works!", 100, 100);

function initFloatingObjects() {
  const loadedImages = [];

  let loadedCount = 0;
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      console.log("Loaded:", src);
      loadedCount++;
      loadedImages.push(img);
      if (loadedCount === images.length) {
        for (let i = 0; i < numObjects; i++) {
          const img = loadedImages[Math.floor(Math.random() * loadedImages.length)];
          floatingObjects.push(new FloatingItem(img));
        }
        animateFloatingObjects();
      }
    };
    img.onerror = () => console.error("Failed to load:", src);
  });
}

function animateFloatingObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  floatingObjects.forEach(obj => {
    obj.update();
    obj.draw(ctx);
  });

  requestAnimationFrame(animateFloatingObjects);
}

initFloatingObjects();

