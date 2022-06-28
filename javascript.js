const topTextBox = document.querySelector('#calculatorCalculateBox');
const bottomTextBox = document.querySelector('#calculatorOutputBox');
const numInput = document.querySelectorAll('.btnNum');
const calculationInput = document.querySelectorAll('.btnFunc');

let calcArray = [];
let lastElement = '';
let displayString = '';
let currentValue = '';
let results = 0;

const bottomDisplayFunc = () => {
    displayString += currentValue;
    bottomTextBox.textContent = displayString;
}

const operate = () => {
    switch (lastElement) {
        case '+':
            results = parseInt(calcArray[0]) + parseInt(displayString);
            break;
        case '-':
            results = parseInt(calcArray[0]) - parseInt(displayString);
            break;
        case '*':
            results = parseInt(calcArray[0]) * parseInt(displayString);
            break;   
        case '/':
            results = parseInt(calcArray[0]) / parseInt(displayString);
            break; 
    } 

}

numInput.forEach(buttonPress => {
    buttonPress.addEventListener('click', () => {
        currentValue = buttonPress.id;
        bottomDisplayFunc();
    })
})

calculationInput.forEach(calculatePress => {
    calculatePress.addEventListener('click', () => {
        lastElement = calcArray[1];
        if (displayString != '' && lastElement === undefined){                        // if a value was pressed and no opeartor was pressed. LastElement = peek at array to check if operator was stored.
            calcArray.push(displayString);
            calcArray.push(calculatePress.id);
            topTextBox.textContent = `${calcArray[0]} ${calculatePress.id}`;
        } else {
            operate();
            bottomTextBox.textContent = results;
            topTextBox.textContent = `${results} ${calculatePress.id}`;
            calcArray = [];
            calcArray.push(results);
            calcArray.push(calculatePress.id);
        }
        displayString = '';


    })
})












































