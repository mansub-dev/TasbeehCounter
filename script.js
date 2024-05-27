let startKar = document.querySelector(".menu");
let khatam = document.querySelector(".close");
let crush = document.querySelector(".sider");
let counter = document.querySelector(".main-counter");
let mLoop = document.querySelector(".loopz");
let resetButton = document.querySelector(".reset");
let line = document.querySelector(".qline");
let day = document.querySelector(".C-day");

let qItems = [
    { elem: document.getElementById("Q-01"), loop: document.getElementById("loopc1"), count: document.getElementById("countc1"), id: "countc1" },
    { elem: document.getElementById("Q-02"), loop: document.getElementById("loopc2"), count: document.getElementById("countc2"), id: "countc2" },
    { elem: document.getElementById("Q-03"), loop: document.getElementById("loopc3"), count: document.getElementById("countc3"), id: "countc3" },
    { elem: document.getElementById("Q-04"), loop: document.getElementById("loopc4"), count: document.getElementById("countc4"), id: "countc4" },
    { elem: document.getElementById("Q-05"), loop: document.getElementById("loopc5"), count: document.getElementById("countc5"), id: "countc5" },
    { elem: document.getElementById("Q-06"), loop: document.getElementById("loopc6"), count: document.getElementById("countc6"), id: "countc6" },
    { elem: document.getElementById("Q-07"), loop: document.getElementById("loopc7"), count: document.getElementById("countc7"), id: "countc7" }
];

// Utility functions
const disblock = (element) => { element.style.display = "block"; };
const disNone = (element) => { element.style.display = "none"; };
const putTxt = (text) => { line.textContent = text; };

// Show and hide sidebar
startKar.addEventListener("click", () => { disblock(crush); });
khatam.addEventListener("click", () => { disNone(crush); });

// Update counter display for a selected Q-item
const updateCounter = (q, qId) => {
    let storedCount = parseInt(localStorage.getItem(qId) || 0);
    counter.textContent = storedCount;
    let storedLoop = parseInt(localStorage.getItem(`loop-${qId}`) || 0);
    mLoop.textContent = storedLoop;
    putTxt(q);
};

// Initialize each Q-item
qItems.forEach(({ elem, id }) => {
    elem.addEventListener("click", () => {
        updateCounter(elem.textContent, id);
    });
});

// Display the current day
const currentDate = new Date().toLocaleString('en-us', { weekday: 'long' });
day.textContent = currentDate;

// Retrieve and display stored counter value
let counterNum = parseInt(localStorage.getItem("genti") || 0);
counter.textContent = counterNum;
let loopNum = parseInt(localStorage.getItem("loop-genti") || 0);
mLoop.textContent = loopNum;

// Main counter click event
counter.addEventListener("click", () => {
    counterNum++;
    if (counterNum >= 100) {
        counterNum = 0;
        loopNum++;
        mLoop.textContent = loopNum;
    }
    counter.textContent = counterNum;
    let currentQItem = qItems.find(q => q.elem.textContent === line.textContent);
    if (currentQItem) {
        localStorage.setItem(currentQItem.id, counterNum);
        localStorage.setItem(`loop-${currentQItem.id}`, loopNum);
        currentQItem.count.textContent = counterNum;
        currentQItem.loop.textContent = loopNum;
    }
    localStorage.setItem("genti", counterNum);
    localStorage.setItem("loop-genti", loopNum);
});

// Reset button event
resetButton.addEventListener("click", () => {
    counterNum = 0;
    loopNum = 0;
    counter.textContent = counterNum;
    mLoop.textContent = loopNum;
    localStorage.setItem("genti", counterNum);
    localStorage.setItem("loop-genti", loopNum);
    qItems.forEach(q => {
        localStorage.setItem(q.id, 0);
        localStorage.setItem(`loop-${q.id}`, 0);
        q.count.textContent = 0;
        q.loop.textContent = 0;
    });
});

// Load initial data
qItems.forEach(({ elem, id, count, loop }) => {
    let storedCount = parseInt(localStorage.getItem(id) || 0);
    count.textContent = storedCount;
    let storedLoop = parseInt(localStorage.getItem(`loop-${id}`) || 0);
    loop.textContent = storedLoop;
});

// Set initial text
putTxt(qItems[0].elem.textContent);