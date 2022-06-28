const topTextBox = document.querySelector('#calculatorCalculateBox');
const bottomTextBox = document.querySelector('#calculatorOutputBox');
const numInput = document.querySelectorAll('.btnNum');
const calculationInput = document.querySelectorAll('.btnFunc');
const modifyInput = document.querySelectorAll('.btnModify');

let calcArray = [];
let lastElement = '';
let displayString = '';
let currentValue = '';
let results = 0;
let flip = false;

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

calculationInput.forEach(calculatePress => {                                            // in all of the IF statements, it checks if lastElement != undefined; can I simplify that
    calculatePress.addEventListener('click', () => {
        lastElement = calcArray[1];
        if (displayString && lastElement === undefined){                        // if a value was pressed and no opeartor was pressed. LastElement = peek at array to check if operator was stored.
            calcArray.push(displayString);
            calcArray.push(calculatePress.id);
            topTextBox.textContent = `${calcArray[0]} ${calculatePress.id}`;
        } else if (!displayString && lastElement != undefined){               // if no imputs were pressed and the operation changes, update the array with the new operator
            calcArray.pop();
            calcArray.push(calculatePress.id);
            topTextBox.textContent = `${calcArray[0]} ${calculatePress.id}`;
        } else if (calculatePress.id === '=' && lastElement != undefined){          // if enter is pressed and there is no operator pressed
            operate();
            bottomTextBox.textContent = results;
            topTextBox.textContent = `${calcArray[0]} ${calcArray[1]} ${displayString} ${calculatePress.id}`;
            calcArray = [];
            calcArray.push(results);
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

modifyInput.forEach(modifyPress => {
    modifyPress.addEventListener('click', () => {
        if (modifyPress.id === 'delete'){
            displayString = displayString.slice(0, -1);
            bottomTextBox.textContent = displayString;
        } else if (modifyPress.id === 'clear'){
            calcArray = [];
            displayString = '';
            bottomTextBox.textContent = '';
            topTextBox.textContent = '';
        } else if (modifyPress.id === 'plusMinus'){
            if (flip == false){
                displayString = "-" + displayString;
                bottomTextBox.textContent = displayString;
                flip = true;
            } else if (flip == true){
                displayString = displayString.slice(1);
                bottomTextBox.textContent = displayString;
                flip = false;
            }
        }
    })
})