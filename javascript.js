const numberClusterPress = document.querySelectorAll('.btnNum');
const numberOperandPress = document.querySelectorAll('.btnFunc');
const bottomBox = document.querySelector('#calculatorOutputBox');
const topBox = document.querySelector('#calculatorCalculateBox');

let currentInputValue = '';
let currentOutputValue = '';
let memoryValue = '';
let memoryOperand = '';

let initialValueCheck = false;
let initialOperandCheck = false;

/*  Outputs the string of the values inputted to the bottom text display and stores the value in currentOutputValue */

const displayOutputValue = () => {
    currentOutputValue += currentInputValue;
    console.log(currentOutputValue);
    bottomBox.textContent = currentOutputValue;
}
 
const additionFunction = () => {                                                           
    let newValue = eval(memoryValue + memoryOperand + currentOutputValue);  // stores the evaluation of the memory value and the new value with the previous memory operand (which is addition)        
    memoryOperand = '+';                                                    // adds the addition operand to memory which wil be used to calculate the value whenever any other operand is pressed. ADDED AFTER calculations are made.
    memoryValue = newValue;                                                 // saves the calculated value to be used in furthur calculations
    topBox.textContent = newValue + ' +';                                   // below code displays the initial steps for more actions
    bottomBox.textContent = newValue;
    currentOutputValue = '';
}

const subtractionFunction = () => {
    let newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    memoryOperand = '-';  
    memoryValue = newValue;                                                 
    topBox.textContent = newValue + ' -';                                  
    bottomBox.textContent = newValue;
    currentOutputValue = '';
}

const multiplyFunction = () => {
    let newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    memoryOperand = '*';  
    memoryValue = newValue;                                                 
    topBox.textContent = newValue + ' x';                                  
    bottomBox.textContent = newValue;
    currentOutputValue = '';
}

const divideFunction = () => {
    let newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    memoryOperand = '/';  
    memoryValue = newValue;                                                 
    topBox.textContent = newValue + ' /';                                  
    bottomBox.textContent = newValue;
    currentOutputValue = '';
}

/*  An event listener for each number button is created which returns the id (which is set to the value of the button).
    Pressing a number button triggers the initialValueCheck which allows for the general function buttons to be operable.           */

numberClusterPress.forEach(numberButtonPress => {                                  
    numberButtonPress.addEventListener('click', () => {
        if (numberButtonPress.className == 'waves-effect blue-grey lighten-5 btn-flat btnCluster btnNum'){
            currentInputValue = numberButtonPress.id;
            initialValueCheck = true;
            displayOutputValue();
        } else {
            return;
        }
    })
})

/*  An event listener for each function button is created. */

numberOperandPress.forEach(numberFuncPress => {
    numberFuncPress.addEventListener('click', () => {
        if (initialValueCheck == true && initialOperandCheck == false){     
            initialOperandCheck = true;                                     // Sets the initialOperandCheck to true which allows for the specific function buttons to be operable
            memoryValue = currentOutputValue;                               // the below code sets the inital displays to show the general numbers                     
            bottomBox.textContent = currentOutputValue;
            currentOutputValue = '';
        }

        if (numberFuncPress.id == 'add' && initialOperandCheck == true){    // triggers when the add button is specifically pressed
            topBox.textContent = memoryValue + " +";                        // adds " +" to the top display box to signify which operand has been pressed
            additionFunction();
        } else if (numberFuncPress.id == 'subtract' && initialOperandCheck == true){
            topBox.textContent = memoryValue + " -"; 
            subtractionFunction();
        } else if (numberFuncPress.id == 'multiply' && initialOperandCheck == true){
            topBox.textContent = memoryValue + " x"; 
            multiplyFunction();
        } else if (numberFuncPress.id == 'divide' && initialOperandCheck == true){
            topBox.textContent = memoryValue + " +"
            divideFunction();
        }
    })
})

