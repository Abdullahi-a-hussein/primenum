const canvas = document.getElementById("canvas");
const w = window.innerWidth;
const h = window.innerHeight;
const PI = Math.PI;
const STEP = 4;
canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext("2d");
ctx.translate(w / 2, h / 2);
ctx.strokeStyle = "#f5427e";
ctx.fillStyle = "#f5427e";
ctx.lineWidth = 1;

const isPrime = (number) => {
  if (number === 1) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  if (number === 3) return true;
  for (let i = 3; i < Math.sqrt(number) + 1; i += 2) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
};

const randomDirection = (direction) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const newDirections = directions.filter(
    ([x, y]) => x != direction[0] || y != direction[1]
  );
  return newDirections[Math.floor(Math.random() * newDirections.length)];
};

function primenum() {
  let number = 1;
  let current = [0, STEP];
  let direction = [0, 1];
  let moveInterval;
  if (moveInterval) clearInterval(moveInterval);
  moveInterval = setInterval(() => {
    const checkPrime = isPrime(number);
    if (checkPrime) {
      direction = randomDirection(direction);
    }
    const next = [
      current[0] + direction[0] * STEP,
      current[1] + direction[1] * STEP,
    ];
    if (checkPrime) {
      ctx.beginPath();
      ctx.arc(current[0], current[1], 3.5, 0, PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(current[0], current[1], 1.5, 0, PI * 2);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.moveTo(current[0], current[1]);
    ctx.lineTo(next[0], next[1]);
    ctx.stroke();
    current = next;
    number++;
  }, 10);
}

primenum();
