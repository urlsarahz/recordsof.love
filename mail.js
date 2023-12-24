const canvas = document.getElementById("note");
const toolbar = document.getElementById("toolbar");
const send = document.getElementById("send");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 2;
let startX;
let startY;

// send canvas ss DOESN'T WORK YET
send.addEventListener('click', e => {
    if (e.target.id === 'send') {
        let image = canvas.toDataURL("image/png");
    }
});

// clear canvas
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

toolbar.addEventListener('click', e => {
    if (e.target.id === 'typewriter') {
        ctx.fillText("Text");
    }
});

// input changes of drawing color and line width 
toolbar.addEventListener('change', e => {

    if(e.target.id === 'pen') {
        pen = e.target.value;
    }
});

// drawing!!
const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = pen;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

