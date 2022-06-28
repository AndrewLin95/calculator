const numberClusterPress = document.querySelectorAll('.btnNum');
const numberOperandPress = document.querySelectorAll('.btnFunc');
const numberModifyPress = document.querySelectorAll('.btnModify');
const bottomBox = document.querySelector('#calculatorOutputBox');
const topBox = document.querySelector('#calculatorCalculateBox');

let currentInputValue = '';
let currentOutputValue = '';
let memoryValue = '';
let memoryOperand = '';
let newValue = '';

let flip = false;
let initialValueCheck = false;
let initialOperandCheck = false;
let equalCheck = false;
let newInputCheck = false;                                                  // if a number is pressed after an equation is completed, a brandnew input is created.

/*  Outputs the string of the values inputted to the bottom text display and stores the value in currentOutputValue */

const displayOutputValue = () => {
    currentOutputValue += currentInputValue;
    bottomBox.textContent = currentOutputValue;
}
 
/*  the if statement is mandatory within each function because:
        1) the memoryOperand and displayFunctionChange function needs to be after the eval().
            - if the memoryOperand change is done before, the previous calculation would not work (it would always add if additionFunc was ran)
            - displayFunctionChange appends the calculated value from newValue and appends it. It must come after.
        2) if the check is false, it skips the eval and changes the existing function to a new function (ie. subtract to add)
*/

const additionFunction = () => {                                                           
    if (initialValueCheck == true){                                             
        newValue = eval(memoryValue + memoryOperand + currentOutputValue);      // stores the evaluation of the memory value and the new value with the previous memory operand (which is addition)        
    }
    memoryOperand = '+';                                                    // adds the addition operand to memory which wil be used to calculate the value whenever any other operand is pressed. ADDED AFTER calculations are made.
    displayFunctionChange();
}

/*  the extra if clause checks if the sign of the currentoutput is negative or not (if amended by the minusPlus function). 
    If it is negative and we are subtracting, we remove the negative and pass it through the addition function.  
*/

const subtractionFunction = () => {
    if (initialValueCheck == true && Math.sign(currentOutputValue) >= 0){
        newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    } else if (initialValueCheck == true && Math.sign(currentOutputValue) < 0){
        currentOutputValue = currentOutputValue.slice(1);
        memoryOperand = '+';
        additionFunction();
    }
    memoryOperand = '-';  
    displayFunctionChange();
}

const multiplyFunction = () => {
    if (initialValueCheck == true){
        newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    }
    memoryOperand = '*';  
    displayFunctionChange();
}

const divideFunction = () => {
    if (initialValueCheck == true){
        newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    }
    memoryOperand = '/';  
    displayFunctionChange();
}

const displayFunctionChange = () => {
    memoryValue = newValue;                                                         // saves the calculated value to be used in furthur calculations
    topBox.textContent = newValue + ' ' + memoryOperand;                                  // below code displays the initial steps for more actions
    bottomBox.textContent = newValue;
    currentOutputValue = '';
}

const equalFunction = () => {
    newValue = eval(memoryValue + memoryOperand + currentOutputValue);
    topBox.textContent = memoryValue + ' ' + memoryOperand + ' ' + currentOutputValue + " ="
    memoryValue = newValue;                                                     // lets the resulting value be used to start a new value
    memoryOperand = '';                                                         // resets operand memory because no new calculations are made.                                                   
    currentOutputValue = '';
    equalCheck = true;                                                         // prevents equal from being pressed again until another operand is pressed
    newInputCheck = true;
    bottomBox.textContent = newValue;                              
}

/*  An event listener for each number button is created which returns the id (which is set to the value of the button).
    Pressing a number button triggers the initialValueCheck which allows for the general function buttons to be operable.           */

numberClusterPress.forEach(numberButtonPress => {                                  
    numberButtonPress.addEventListener('click', () => {
        if (numberButtonPress.className == 'waves-effect blue-grey lighten-5 btn-flat btnCluster btnNum' && newInputCheck == false){
            currentInputValue = numberButtonPress.id;
            initialValueCheck = true;
            displayOutputValue();
        } else if (numberButtonPress.className == 'waves-effect blue-grey lighten-5 btn-flat btnCluster btnNum' && newInputCheck == true) {
            memoryValue = '';                                                           // resets everything if numbers are pressed after equal is pressed
            topBox.textContent = '';                                                    
            currentInputValue = numberButtonPress.id;
            initialValueCheck = true;
            displayOutputValue();
        }
    })
})

/*  An event listener for each function button is created. */

numberOperandPress.forEach(numberFuncPress => {
    numberFuncPress.addEventListener('click', () => {
        newInputCheck = false;
        flip = false;
        if (initialValueCheck == true && initialOperandCheck == false && equalCheck == false){     
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
            topBox.textContent = memoryValue + " *"; 
            multiplyFunction();
        } else if (numberFuncPress.id == 'divide' && initialOperandCheck == true){
            topBox.textContent = memoryValue + " /";
            divideFunction();
        } else if (numberFuncPress.id == 'equal' && initialOperandCheck == true){
            equalFunction();
        } else {
            return;
        }
        initialValueCheck = false;
    })
})


numberModifyPress.forEach(numModifyPress => {
    numModifyPress.addEventListener('click', () => {
        if (numModifyPress.id == 'plusMinus' && initialValueCheck == true){
            if (flip == false){
                currentOutputValue = "-" + currentOutputValue;
                bottomBox.textContent = currentOutputValue;
                flip = true;
            } else if (flip == true){
                currentOutputValue = currentOutputValue.slice(1);
                bottomBox.textContent = currentOutputValue;
                flip = false;
            }
        }
    })
})
