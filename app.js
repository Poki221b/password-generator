//Dom elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Generate event listener 
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Copy result to clipboard
clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. init pw var
    // 2. filter out unchecked types
    // 3. loop over length call gen func for each type
    // 4. add final pw to the pw var and return
    
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount: ', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item) [0]
    );

    // console.log('typesArr: ', typesArr);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName),

            generatedPassword += randomFunction[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%/;:[]{}+<>?*\,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Matrix background
const canvas = document.getElementById('Fundo')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.heigth = window.innerHeight

const bin = '01'

const fontSize = 8
const columns = canvas.width / fontSize

const rainDrop = []

for(let x = 0; x < columns; x++){
    rainDrop[x] = 1
}

const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)'
    context.fillRect(0,0, canvas.width, canvas.heigth)
    context.fillStyle = '#0f0'
    context.font = fontSize + 'px monospace'

    for(let i = 0; i < rainDrop.length; i++){
        const text = bin.charAt(Math.floor(Math.random() * bin.length))
        context.fillText(text, i * fontSize, rainDrop[i] * fontSize)

        if(rainDrop[i] * fontSize > canvas.heigth && Math.random() > 0.975){
            rainDrop[i] = 0
        }

        rainDrop[i]++
    }
}

setInterval(draw, 30)
