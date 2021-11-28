const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const buildTriangleButton = document.getElementById("build-triangle-btn");
const transformButton = document.getElementById("transform-btn");
const toInitialStateButton = document.getElementById("to-initial-btn");

const WIDTH = 500;
const HEIGHT = 400;
const SCALE = 10;

let Triangle = {
  A: {
    x: 0,
    y: 0,
  },
  B: {
    x: 0,
    y: 0,
  },
  C: {
    x: 0,
    y: 0,
  }
}

let initialState;

const buildGrid = () => {
  for (let x = 0; x < WIDTH; x += SCALE) {
    context.moveTo(x, 0);
    context.lineTo(x, HEIGHT);
  }

  for (let y = 0; y < HEIGHT; y += SCALE) {
    context.moveTo(0, y);
    context.lineTo(WIDTH, y);
  }

  context.moveTo(0, 0);

  context.strokeStyle = "#8b8b8b";
  context.strokeWidth = 1
  context.stroke();
}

const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  buildGrid();
}

const drawTriangle = () => {
  context.beginPath();
  context.moveTo(Triangle.A.x, Triangle.A.y);
  context.lineTo(Triangle.B.x, Triangle.B.y);
  context.lineTo(Triangle.C.x, Triangle.C.y);
  context.closePath();

  context.fillStyle = "#FFCC00";
  context.fill();
}

buildTriangleButton.onclick = () => {
  const X = document.getElementById("startX").value;
  const Y = document.getElementById("startY").value;
  const width = document.getElementById("width").value;


  Triangle.A.x = X*SCALE;
  Triangle.A.y = Y*SCALE;
  Triangle.B.x = Triangle.A.x + width*SCALE;
  Triangle.B.y = Triangle.A.y;
  Triangle.C.x = (Triangle.A.x + Triangle.B.x) / 2;
  Triangle.C.y = Triangle.A.y - width * SCALE;
  initialState = JSON.parse(JSON.stringify(Triangle));

  drawTriangle();
}

transformButton.onclick = () => {
  const N = document.getElementById("N").value;
  const M = document.getElementById("M").value;
  const angle = document.getElementById("rotation").value;

  performTransform(N, M, angle);
  clearCanvas();
  drawTriangle();
  window.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

function degreesToRadians(degrees)
{
  return degrees * (Math.PI/180);
}

const performTransform = (N, M, angle) => {
  Object.keys(Triangle).map((P) => {
    Triangle[P].x += N*SCALE;
    Triangle[P].y += M*SCALE;
  })

  angle = degreesToRadians(angle);

  Object.keys(Triangle).map((P) => {
    Triangle[P].x = Triangle[P].x * Math.cos(angle) + Triangle[P].y * Math.sin(angle);
    Triangle[P].y = -Triangle[P].x * Math.sin(angle) + Triangle[P].y * Math.cos(angle);
  })
}

toInitialStateButton.onclick = () => {
  clearCanvas();
  Triangle = JSON.parse(JSON.stringify(initialState));
  drawTriangle();
}

buildGrid()