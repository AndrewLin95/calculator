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

const bottomDisplayFunc = (value) => {
    currentValue += value;                              // can shorten to one line?
    bottomTextBox.textContent = currentValue;
}

numInput.forEach(buttonPress => {
    buttonPress.addEventListener('click', () => {
        bottomDisplayFunc(buttonPress.id);
    })
})

operateFunction = (value) => {
    toggle = false;
    dotToggle = true;
    if (!operator && currentValue){
        valueOne = currentValue;
    } else if (valueOne && currentValue){
        valueTwo = currentValue;
        operate(operator, valueOne, valueTwo);
        bottomTextBox.textContent = valueOne;
    }                              // runs if no values were inputted after an operator was selector (changes the operator)
    currentValue = '';
    operator = value;
    topTextBox.textContent = `${valueOne} ${operator}`;
}

function operate(operator, a, b){
    let aVal = Number(a);
    let bVal = Number(b);
    switch (operator){
        case "+":
            valueOne = aVal + bVal;
            break;
        case "-":
            valueOne = aVal - bVal;
            break;
        case '/':
            if (bVal === 0){
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
    valueOne = +valueOne.toFixed(3);
}

function clearFunction(){
    currentValue = '';              // if empty = will return false, if filled, will return true
    valueOne = '';
    valueTwo = '';
    operator = '';
    bottomTextBox.textContent = '';
    topTextBox.textContent = '';
}

const equalFunction = () => {
    if (valueOne && currentValue){
        topTextBox.textContent = `${valueOne} ${operator} ${currentValue} =`
        operate(operator, valueOne, currentValue);
        bottomTextBox.textContent = valueOne;
        operator = '';
        currentValue = '';
        toggle = false;
    }
}

const modifyFunction = (buttonID) => {
    if (buttonID === 'backspace'){
        currentValue = currentValue.slice(0, -1);
    } else if (buttonID === 'clear'){
        clearFunction();
        return;
    } else if (buttonID === 'plusMinus'){
        if (!toggle){
            currentValue = "-" + currentValue;
            toggle = !toggle;
        } else{
            currentValue = currentValue.slice(1);
            toggle = !toggle;
        }
    } else if (buttonID === '.' && dotToggle){            
        dotToggle = false;
        currentValue += ".";
    } 
    bottomTextBox.textContent = currentValue;
}

modifyInput.forEach(modifyPress => {
    modifyPress.addEventListener('click', () => modifyFunction(modifyPress.id))
})

funcInput.forEach(funcPress => {
    funcPress.addEventListener('click', () => {
        operateFunction(funcPress.id);
    })
})

equalInput.addEventListener('click', equalFunction);

body.addEventListener('keydown', (e) => {                                           // add rest of keyboard support. update CSS. need to convert the other eventlisteners to individual functions
    console.log(e.key);
    if (e.key >= 0 && e.key <= 9) bottomDisplayFunc(e.key);
    if (e.key === '=' || e.key === 'Enter') equalFunction();
    if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') (operateFunction(e.key));
    if (e.key === 'backspace' || e.key === '.') (modifyFunction(e.key)); 
})