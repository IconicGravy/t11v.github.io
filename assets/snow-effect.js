const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let w, h, snowflakes = [];

let snowColor = { r: 255, g: 255, b: 255 };  // start white
let targetColor = { r: 255, g: 255, b: 255 };
let transitionSpeed = 0.05; // fading effect (not added)

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

window.updateSnowColor = function(color) {
  targetColor = hexToRgb(color);
};

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createSnowflakes(count, sizeRange, speedRange) {
  const flakes = [];
  for (let i = 0; i < count; i++) {
    flakes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * sizeRange + 1,
      speed: Math.random() * speedRange + 0.5,
      drift: Math.random() * 1 - 0.5
    });
  }
  return flakes;
}

function initSnow() {
  snowflakes = []
    .concat(createSnowflakes(150, 2, 1))
    .concat(createSnowflakes(200, 3, 1.5))
    .concat(createSnowflakes(150, 4, 2.5));
}


function updateSnowflake(s) {
  s.y += s.speed;
  s.x += Math.sin(s.y * 0.01) * 0.5 + s.drift;

  if (s.y > h) {
    s.y = -5;
    s.x = Math.random() * w;
  }
  if (s.x > w || s.x < 0) {
    s.x = Math.random() * w;
    s.y = -5;
  }
}

function drawSnowflake(s) {
  ctx.beginPath();
  ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);

  // Smooth transitions (not added)
  snowColor.r += (targetColor.r - snowColor.r) * transitionSpeed;
  snowColor.g += (targetColor.g - snowColor.g) * transitionSpeed;
  snowColor.b += (targetColor.b - snowColor.b) * transitionSpeed;

  ctx.fillStyle = `rgb(${snowColor.r}, ${snowColor.g}, ${snowColor.b})`;
  ctx.fill();
}

function loop() {
  ctx.clearRect(0, 0, w, h);
  snowflakes.forEach(s => {
    updateSnowflake(s);
    drawSnowflake(s);
  });
  requestAnimationFrame(loop);
}

initSnow();
loop();


