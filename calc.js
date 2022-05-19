
const calc = document.querySelector('.calc-container');
const numBtton = document.querySelectorAll('.number')
const operatorBttn = document.querySelectorAll('.operator');
const result = document.querySelector('.input-num');
let firstNum = "";
let secondNum = "";
let operator = "";


function getInputNumber(event, input) {
    if(event.target.innerText === '+/-') { //if sign button was clicked 
        input = input.charAt(0) === '-' ? result.innerText.slice(1): '-' + result.innerText; //if number(s) were previously negative; will switch to positive else switch to negative
    } else {
        if (!input) input = event.target.innerText;//If there was no previous number
        else input = input + event.target.innerText;//if another number was clicked in tenths or hundredths etc or if sign button was clicked

    }

    result.innerText = input

    return input;
}

function getInputOperator(event, input) {
    if(secondNum){ //if second number exists and second operator was clicked again
        console.log(firstNum,operator,secondNum)
        firstNum = result.innerText = getTotal(); // the two numbers will automatically operated/evaluated 
        secondNum = "";
    }
    input = event.target.innerText; // if operator was clicked again consecutively, the operator will update to recent one

    return input;
}

function getTotal() {
    if(operator === '+') return parseFloat(firstNum) + parseFloat(secondNum);
    else if(operator === '−') return parseFloat(firstNum) - parseFloat(secondNum)
    else if(operator === '×') return parseFloat(firstNum) * parseFloat(secondNum);
    else if(operator === '÷') return parseFloat(firstNum) / parseFloat(secondNum);
    else alert("Error!");
}

function getInput(event, inputType, input, callback) {
    for(let i = 0; i < inputType.length; i++) {
        if (inputType[i] === event.target){
            input = callback(event, input)
        } 
    }

    return input;
}

calc.addEventListener('click', (event) => {

    operator = getInput(event, operatorBttn, operator, getInputOperator); // When an operator button was clicked (+,-,*,/)

    if(!operator) firstNum = getInput(event, numBtton, firstNum, getInputNumber); //When the initial number was clicked as input
    else {
        if(!firstNum) firstNum = "0"; //If operator was clicked before clicking/input number, it automatically assign the initial input number to 0
        secondNum = getInput(event, numBtton, secondNum, getInputNumber);
    }

    if(event.target.innerText === 'C') {
        result.innerText = "0"
        firstNum = secondNum = operator = "";
    }

    if(event.target.innerText === '=') {
        if(firstNum && secondNum){
            result.innerText = getTotal(); //otherwise nothing will happen if equal is clicked
            secondNum = operator = ""; //reset second number and operator once the result
        }
    }
});
