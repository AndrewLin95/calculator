const topTextBox = document.querySelector('#calculatorCalculateBox');
const bottomTextBox = document.querySelector('#calculatorOutputBox');
const numInput = document.querySelectorAll('.btnNum');
const funcInput = document.querySelectorAll('.btnFunc');
const modifyInput = document.querySelectorAll('.btnModify');
const equalInput = document.querySelector('.btnEqual');

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

equalInput.addEventListener('click', () => {
    if (valueOne && currentValue){
        topTextBox.textContent = `${valueOne} ${operator} ${currentValue} =`
        operate(operator, valueOne, currentValue);
        bottomTextBox.textContent = valueOne;
        operator = '';
        currentValue = '';
        toggle = false;
    }
})

modifyInput.forEach(modifyPress => {
    modifyPress.addEventListener('click', () => {
        if (modifyPress.id === 'delete'){
            currentValue = currentValue.slice(0, -1);
        } else if (modifyPress.id === 'clear'){
            clearFunction();
            return;
        } else if (modifyPress.id === 'plusMinus'){
            if (!toggle){
                currentValue = "-" + currentValue;
                toggle = !toggle;
            } else{
                currentValue = currentValue.slice(1);
                toggle = !toggle;
            }
        } else if (modifyPress.id === 'dot' && dotToggle){            
            dotToggle = false;
            currentValue += ".";
        } 
        bottomTextBox.textContent = currentValue;
    })
})

funcInput.forEach(funcPress => {
    funcPress.addEventListener('click', () => {
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
        operator = funcPress.id;
        topTextBox.textContent = `${valueOne} ${operator}`;
    })
})


