const generateBtn = document.getElementById('generate');
const numbersDiv = document.getElementById('numbers');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Animal Face Test Variables
const URL = "https://teachablemachine.withgoogle.com/models/p_Xwlfw5L/";
let model, labelContainer, maxPredictions;

const imageInput = document.getElementById('image-input');
const uploadBtn = document.getElementById('upload-btn');
const imagePreview = document.getElementById('image-preview');
const loader = document.getElementById('loader');
const resultContainer = document.getElementById('result-container');
const resultLabel = document.getElementById('result-label');
const labelBarContainer = document.getElementById('label-container');

// Load the model
async function initModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// Handle Image Upload
uploadBtn.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        imagePreview.innerHTML = `<img id="uploaded-image" src="${event.target.result}">`;
        resultContainer.style.display = 'none';
        loader.style.display = 'block';

        if (!model) await initModel();
        
        const img = document.getElementById('uploaded-image');
        predict(img);
    };
    reader.readAsDataURL(file);
});

async function predict(imgElement) {
    const prediction = await model.predict(imgElement);
    loader.style.display = 'none';
    resultContainer.style.display = 'block';
    
    // Sort predictions to find the top result
    prediction.sort((a, b) => b.probability - a.probability);
    
    const topResult = prediction[0];
    resultLabel.textContent = `You look like a ${topResult.className}!`;
    
    labelBarContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i];
        const percentage = (classPrediction.probability * 100).toFixed(0);
        
        const barHtml = `
            <div class="bar-container">
                <span style="width: 80px; text-align: left;">${classPrediction.className}</span>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span style="width: 40px;">${percentage}%</span>
            </div>
        `;
        labelBarContainer.innerHTML += barHtml;
    }
}

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Lotto Generator Logic
generateBtn.addEventListener('click', () => {
    numbersDiv.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    for (const number of sortedNumbers) {
        const span = document.createElement('span');
        span.textContent = number;
        numbersDiv.appendChild(span);
    }
});