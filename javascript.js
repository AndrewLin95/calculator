const topTextBox = document.querySelector('#calculatorCalculateBox');
const bottomTextBox = document.querySelector('#calculatorOutputBox');
const numInput = document.querySelectorAll('.btnNum');
const funcInput = document.querySelectorAll('.btnFunc');
const modifyInput = document.querySelectorAll('.btnModify');
const equalInput = document.querySelector('.btnEqual');

let currentValue = '';              // if empty = will return false, if filled, will return true
let valueOne = '';
let valueTwo = '';
let operator = '';
let flip = false;

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
    let aVal = parseInt(a);
    let bVal = parseInt(b);
    switch (operator){
        case "+":
            valueOne = aVal + bVal;
            break;
        case "-":
            valueOne = aVal - bVal;
            break;
        case '/':
            if (b === '0'){
                bottomTextBox.textContent = "Error!";   
                //clear function    
                return;
            } 
            valueOne = aVal / bVal;
            break;
        case '*':
            valueOne = aVal * bVal;
            break;
    }
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
        valueTwo = currentValue;
        topTextBox.textContent = `${valueOne} ${operator} ${valueTwo} =`
        operate(operator, valueOne, valueTwo);
        bottomTextBox.textContent = valueOne;
        currentValue = '';
    }
})

modifyInput.forEach(modifyPress => {
    modifyPress.addEventListener('click', () => {
        if (modifyPress.id === 'delete'){
            currentValue = currentValue.slice(0, -1);
            bottomTextBox.textContent = currentValue;
        } else if (modifyPress.id === 'clear'){
            clearFunction();
        } else if (modifyPress.id === 'plusMinus'){
            if (!flip){
                currentValue = "-" + currentValue;
                flip = !flip;
            } else{
                currentValue = currentValue.slice(1);
                flip = !flip;
            }
            bottomTextBox.textContent = currentValue;
        }
    })
})

funcInput.forEach(funcPress => {
    funcPress.addEventListener('click', () => {
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


