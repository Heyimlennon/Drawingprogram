const canvas = document.getElementById('skinCanvas');
const ctx = canvas.getContext('2d');

// Default brush properties
let brushType = 'basic';
let brushColor = '#000000';
let brushSize = 5;

// Initialize Pickr color picker
const pickr = Pickr.create({
  el: '#colorPicker',
  theme: 'classic',
  default: brushColor,
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      rgba: true,
    },
  },
});

pickr.on('change', (color) => {
  brushColor = color.toHEXA().toString();
});

// Simple brush logic
let drawing = false;

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
  if (drawing) {
    switch (brushType) {
      case 'basic':
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, brushSize, 0, Math.PI * 2);
        ctx.fillStyle = brushColor;
        ctx.fill();
        break;
      case 'texture':
        // Texture brush logic (using an image or pattern)
        const pattern = ctx.createPattern(document.getElementById('texturePattern'), 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(e.offsetX - brushSize / 2, e.offsetY - brushSize / 2, brushSize, brushSize);
        break;
    }
  }
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
});

// Brush selector
document.getElementById('brushSelector').addEventListener('change', (e) => {
  brushType = e.target.value;
});

// Save button functionality
document.getElementById('saveBtn').addEventListener('click', () => {
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'skin.png';
  link.click();
});
