const canvas = document.getElementById('skinCanvas');
const ctx = canvas.getContext('2d');

// Simple drawing functionality
let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

// Save button functionality
document.getElementById('saveBtn').addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'skin.png';
  link.click();
});
