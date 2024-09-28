let history = [];
let isDrawing = false;
let lastX, lastY;

const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const retrieveButton = document.getElementById('retrieveButton');
const fontSizePicker = document.getElementById('fontSizePicker');
const lineWidthSlider = document.getElementById('lineWidthSlider');

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (event) => {
     ctx.fillStyle = event.target.value;
     ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
     ctx.fillStyle = event.target.value;
     ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener('mousedown', (event) => {
     isDrawing = true;
     lastX = event.offsetX;
     lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
     if (isDrawing) {
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(event.offsetX, event.offsetY);
          ctx.stroke();

          lastX = event.offsetX;
          lastY = event.offsetY;
     }
});

canvas.addEventListener('contextmenu', (event) => {
     event.preventDefault();
});

canvas.addEventListener('mouseup', () => {
     isDrawing = false;
});

fontSizePicker.addEventListener('change', (event) => {
     ctx.lineWidth = event.target.value;
});

lineWidthSlider.addEventListener('input', (event) => {
     ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
     localStorage.setItem('canvasContents', canvas.toDataURL());
     let link = document.createElement('a');
     link.download = 'my-canvas.png';
     link.href = canvas.toDataURL();
     link.click();
});

retrieveButton.addEventListener('click', () => {
     let savedCanvas = localStorage.getItem('canvasContents');
     if (savedCanvas) {
          let img = new Image();
          img.src = savedCanvas;
          ctx.drawImage(img, 0)
     }
});