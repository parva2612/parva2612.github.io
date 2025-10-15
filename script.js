function getRandomIntStep10(min = 750, max = 1250) {
  const step = 10;
  const range = Math.floor((max - min) / step) + 1;
  const randomStep = Math.floor(Math.random() * range);
  return min + randomStep * step;
}

// ===== LOADER =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("fade-out"), getRandomIntStep10());
});

// ===== FLOATING BACKGROUND (SUBTLE PARTICLES) =====
const canvasBG = document.getElementById("floatingBackground");
const ctxBG = canvasBG.getContext("2d");
let particles = [];

function resizeCanvasBG() {
  canvasBG.width = window.innerWidth;
  canvasBG.height = window.innerHeight;
}
resizeCanvasBG();
window.addEventListener("resize", resizeCanvasBG);

function createParticles() {
  particles = [];
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * canvasBG.width,
      y: Math.random() * canvasBG.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? "rgba(0,188,212,0.2)" : "rgba(255,64,129,0.2)"
    });
  }
}
createParticles();

function animateBG() {
  ctxBG.clearRect(0, 0, canvasBG.width, canvasBG.height);
  particles.forEach(p => {
    ctxBG.beginPath();
    ctxBG.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctxBG.fillStyle = p.color;
    ctxBG.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvasBG.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvasBG.height) p.dy *= -1;
  });
  requestAnimationFrame(animateBG);
}
animateBG();

// ===== SKILLS CLOUD (RANDOM SLOW DRIFT) =====
const skills = [
  "Python", "Pandas", "NumPy", "C++", "SQL", "Redis", "MT5", "React", "PineScript",
  "Django", "IBKR", "Machine Learning", "Dash", "Plotly", "Streamlit",
  "APIs", "Data Pipelines", "Low-Latency"
];

const canvas = document.getElementById("skillsCanvas");
const ctx = canvas.getContext("2d");
let nodes = [];

function resizeCanvas() {
  const wrapper = document.querySelector(".skills-graph-wrapper");
  const dpr = window.devicePixelRatio || 1;

  const width = wrapper.offsetWidth;
  const height = wrapper.offsetHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);
}

function generateNodes() {
  nodes = [];
  ctx.font = "14px Inter";

  const padding = 20;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  let attempts = 0;
  for (let i = 0; i < skills.length && attempts < 3000; ) {
    const text = skills[i];
    const textWidth = ctx.measureText(text).width;
    const radius = textWidth / 2 + 14;

    const x = Math.random() * (width - 2 * radius - padding * 2) + radius + padding;
    const y = Math.random() * (height - 2 * radius - padding * 2) + radius + padding;

    let overlap = false;
    for (const node of nodes) {
      const dx = node.x - x;
      const dy = node.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < node.radius + radius + 10) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      nodes.push({ text, x, y, radius });
      i++;
    }
    attempts++;
  }
}

function drawGraph() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "14px Inter";

  // Draw connections
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.random() > 0.8) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  nodes.forEach(n => {
    // Circle
    ctx.beginPath();
  ctx.fillStyle = Math.random() > 0.5
    ? "rgba(0,188,212,0.8)"
    : "rgba(255,64,129,0.8)";
    ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = "#fff";
    ctx.fillText(n.text, n.x, n.y);
  });
}

function initGraph() {
  resizeCanvas();
  generateNodes();
  drawGraph();
}

window.addEventListener("load", initGraph);
window.addEventListener("resize", initGraph);
