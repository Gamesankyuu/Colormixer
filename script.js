function randomColor(mode) {
  let r, g, b;
  if (mode === "pastel") {
    r = Math.floor(Math.random() * 127 + 127);
    g = Math.floor(Math.random() * 127 + 127);
    b = Math.floor(Math.random() * 127 + 127);
  } else if (mode === "contrast") {
    r = Math.random() < 0.5 ? 0 : 255;
    g = Math.random() < 0.5 ? 0 : 255;
    b = Math.random() < 0.5 ? 0 : 255;
  } else {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function generatePalette() {
  const count = parseInt(document.getElementById("colorCount").value) || 4;
  const mode = document.getElementById("mode").value;
  const palette = document.getElementById("palette");
  palette.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const color = randomColor(mode);

    const card = document.createElement("div");
    card.className = "color-card";

    const box = document.createElement("div");
    box.className = "color-box";
    box.style.background = color;
    box.title = "คลิกเพื่อคัดลอก";
    box.onclick = () => {
      navigator.clipboard.writeText(color);
      alert("คัดลอกรหัสสีแล้ว: " + color);
    };

    const info = document.createElement("div");
    info.className = "color-info";
    info.textContent = "คลิกเพื่อคัดลอกรหัสสี"; // ข้อความแทน textarea

    card.appendChild(box);
    card.appendChild(info);
    palette.appendChild(card);
  }
}

function downloadPNG() {
  html2canvas(document.querySelector(".paper"), {
    backgroundColor: null,
    scale: 2
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = "summary.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

document.getElementById("generate").addEventListener("click", generatePalette);
document.getElementById("downloadPNG").addEventListener("click", downloadPNG);

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.body.appendChild(script);

window.onload = generatePalette;
