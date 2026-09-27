let arr = [];

function generateArray(size = 20) {
  arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100) + 10);
  }
  renderBars();
}
function renderBars(compareIndices = [], sortedFrom = arr.length) {
  const barsContainer = document.getElementById("bars");
  barsContainer.innerHTML = "";

  arr.forEach((value, i) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 2 + "px";
    bar.textContent = value; // <-- shows the number

    if (i >= sortedFrom) {
      bar.style.background = "#66bb6a";
    } else if (compareIndices.includes(i)) {
      bar.style.background = "#ef5350";
    } else {
      bar.style.background = "#4db6ac";
    }

    barsContainer.appendChild(bar);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort() {
  document.getElementById("sort").disabled = true;
  document.getElementById("randomize").disabled = true;

  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderBars([j, j + 1], n - i);
      await sleep(150);

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderBars([j, j + 1], n - i);
        await sleep(150);
      }
    }
  }
  renderBars([], 0);

  document.getElementById("sort").disabled = false;
  document.getElementById("randomize").disabled = false;
}

document.getElementById("randomize").addEventListener("click", () => {
  generateArray();
});

document.getElementById("sort").addEventListener("click", () => {
  bubbleSort();
});

generateArray();