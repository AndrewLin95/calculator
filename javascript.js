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

const bottomDisplayFunc = (value) => {
    currentValue += value;
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
            if (b === 0){
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

equalInput.addEventListener('click', () => {
    if (valueOne && currentValue){
        valueTwo = currentValue;
        topTextBox.textContent = `${valueOne} ${operator} ${valueTwo} =`
        operate(operator, valueOne, valueTwo);
        bottomTextBox.textContent = valueOne;
        currentValue = '';
    }
})


funcInput.forEach(funcPress => {
    funcPress.addEventListener('click', () => {
        if (!operator && currentValue){
            valueOne = currentValue;
            operator = funcPress.id;
            topTextBox.textContent = `${valueOne} ${operator}`;
            currentValue = '';
        } else if (valueOne && currentValue){
            valueTwo = currentValue;
            operate(operator, valueOne, valueTwo);
            operator = funcPress.id;
            topTextBox.textContent = `${valueOne} ${operator}`;
            bottomTextBox.textContent = valueOne;
            currentValue = '';
        } else if (valueOne && !currentValue){                      // runs if no values were inputted after an operator was selector (changes the operator)
            operator = funcPress.id;
            topTextBox.textContent = `${valueOne} ${operator}`;
        }
    })
})


