const topTextBox = document.querySelector('#calculatorCalculateBox');
const bottomTextBox = document.querySelector('#calculatorOutputBox');
const numInput = document.querySelectorAll('.btnNum');
const funcInput = document.querySelectorAll('.btnFunc');
const modifyInput = document.querySelectorAll('.btnModify');
const equalInput = document.querySelector('.btnEqual');
const body = document.querySelector('body');

let currentValue = '';              
let valueOne = '';
let valueTwo = '';
let operator = '';
let toggle = false;
let dotToggle = true;

const bottomDisplayFunc = (value) => {                  // function that displays the string to the screens
    currentValue += value;                              // can shorten to one line?
    bottomTextBox.textContent = currentValue;
}

numInput.forEach(buttonPress => {                       // function that takes the input and pushes to function to display
    buttonPress.addEventListener('click', () => {
        bottomDisplayFunc(buttonPress.id);
    })
})

operateFunction = (value) => {                          // logic for the calculation to operate on the inputs.
    toggle = false;
    dotToggle = true;
    if (!operator && currentValue){                     // if no operator is pressed and the current value is present. push to valueOne (memory)
        valueOne = currentValue;
    } else if (valueOne && currentValue){               // if valueOne is present and currentValue is detected, gets ready to calculate
        valueTwo = currentValue;
        operate(operator, valueOne, valueTwo);
        bottomTextBox.textContent = valueOne;
    }                              // runs if no values were inputted after an operator was selector (changes the operator)
    currentValue = '';
    operator = value;
    topTextBox.textContent = `${valueOne} ${operator}`;
}

function operate(operator, a, b){                       // calculation operator that takes in two values and the opeartor.
    let aVal = Number(a);                               // converts the strings to numbers prior to calculation
    let bVal = Number(b);
    switch (operator){
        case "+":
            valueOne = aVal + bVal;
            break;
        case "-":
            valueOne = aVal - bVal;
            break;
        case '/':
            if (bVal === 0){                            // returns negative if divide by 0 is detected
                clearFunction();
                valueOne = 'Error!';
                return;
            } 
            valueOne = aVal / bVal;
            break;
        case '*':
            valueOne = aVal * bVal;
            break;
    }
    valueOne = +valueOne.toFixed(3);                    // returns the value to a 3 decimal points. the '+' removes any excess zeros.
}

function clearFunction(){                                   // clears all existing data
    currentValue = '';              
    valueOne = '';
    valueTwo = '';
    operator = '';
    bottomTextBox.textContent = '';
    topTextBox.textContent = '';
}

const equalFunction = () => {                               // calculates the data.
    if (valueOne && currentValue && operator){
        topTextBox.textContent = `${valueOne} ${operator} ${currentValue} =`
        operate(operator, valueOne, currentValue);
        bottomTextBox.textContent = valueOne;
        operator = '';
        currentValue = '';
        toggle = false;
    }
}

const modifyFunction = (buttonID) => {
    if (buttonID === 'backspace'){                      // function to delete the last item entered in the string
        currentValue = currentValue.slice(0, -1);
    } else if (buttonID === 'clear'){                   // function to clear all data
        clearFunction();
        return;
    } else if (buttonID === 'plusMinus'){               // function that adds the negative or positive and bases it on a toggle
        if (!toggle){
            currentValue = "-" + currentValue;
        } else{
            currentValue = currentValue.slice(1);
        }
        toggle = !toggle;
    } else if (buttonID === '.' && dotToggle){                  // function to add a decimal point. a toggle is present to prevent pressing this multiple times
        dotToggle = false;                                      // toggle is reset once enter or another operator is pressed.
        currentValue += ".";
    } 
    bottomTextBox.textContent = currentValue;
}

modifyInput.forEach(modifyPress => {
    modifyPress.addEventListener('click', () => modifyFunction(modifyPress.id))     // cluster eventlisteners for modifications (delete, minus/positive, decimal)
})

funcInput.forEach(funcPress => {                                // cluster evenlisteners for operator presses (plus, minus, divide, multiple)
    funcPress.addEventListener('click', () => {
        operateFunction(funcPress.id);
    })
})

equalInput.addEventListener('click', equalFunction);            // dedicated eventlistener for enter

body.addEventListener('keydown', (e) => {                       // detects keydown events and redirects to the corresponding function
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9) bottomDisplayFunc(e.key);
    if (e.key === '=' || e.key === 'Enter') equalFunction();
    if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') (operateFunction(e.key));
    if (e.key === 'backspace' || e.key === '.') (modifyFunction(e.key)); 
})