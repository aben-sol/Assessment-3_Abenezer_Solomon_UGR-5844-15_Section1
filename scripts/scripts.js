import { Calculator } from "./calculator.js";

// custom event listener
function addGlobalEventListeners(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e);
    });
}

// global variables
let operandA = null;
let operandB = null;
let operator = null;
let currentInput = 1;

//operators 
const operators = ['+', '-', '*', '/'];

// instantiate the calculator class
let calculator = new Calculator();

// get the data-value attribute of the element
function getDataValue(element) {
    return element.getAttribute('data-value');
}

// elements
const display = document.querySelector('#display');

const inputOperand = (operand) => {
    // if operator is not set, reset the current input to 1
    if (!operator){
        currentInput = 1;
    }

    if (currentInput === 1) {
        operandA = operandA ? operandA + operand : operand;
        display.value = operandA;
    } else {
        operandB = operandB ? operandB + operand : operand;
        display.value = operandB;
    }
}

const inputOperator = (op) => {
    if (currentInput === 2) {
        // if operandB is not null, calculate the result
        if (operandB){
            try{
                operandA = calculator.calculate(parseFloat(operandA), parseFloat(operandB), operator);
                display.value = operandA;
            }catch(e){
                display.value = e.message;
            }
        }
        operandB = null;
        operator = op;
    }else if (currentInput === 1){
        // handles negative operand
        if (!operandA && op === '-'){
            operandA = '-';
            display.value = operandA;
        }else if (!operandA){
            //nothing happens
            return;
        }else {
            currentInput = 2;
            operator = op;
        }
    }
}

const equals = () => {
    if (operandA && operandB){
        try{
            operandA = calculator.calculate(parseFloat(operandA), parseFloat(operandB), operator);
            display.value = operandA;
        }catch(e){
            display.value = e.message;
        }
        operandB = null;
        operator = null;
    }
}   

const clear = () => {
    operandA = null;
    operandB = null;
    operator = null;
    currentInput = 1;
    display.value = '';
}

addGlobalEventListeners('click', '.btn', (e) => {
    const value = getDataValue(e.target);
    if (value === 'c'){
        clear();
    }else if (operators.includes(value)){
        inputOperator(value);
    }else if (value === '='){
        equals();
    }else {
        inputOperand(value);
    }
});

