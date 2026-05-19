const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');

generateBtn.addEventListener('click', () => {
    numbersDiv.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    for (const number of numbers) {
        const span = document.createElement('span');
        span.textContent = number;
        numbersDiv.appendChild(span);
    }
});