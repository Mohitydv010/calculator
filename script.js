let display = document.getElementById("display");
let previous = document.getElementById("previous");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;


// Display update

function updateDisplay() {
    display.value = currentInput;
}


// Number button

function addNumber(number) {

    if (waitingForSecondNumber) {
        currentInput = number;
        waitingForSecondNumber = false;
    }

    else if (currentInput === "0") {
        currentInput = number;
    }

    else {
        currentInput += number;
    }

    updateDisplay();
}


// Decimal

function addDecimal() {

    if (waitingForSecondNumber) {
        currentInput = "0.";
        waitingForSecondNumber = false;

        updateDisplay();
        return;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}


// Operator

function addOperator(nextOperator) {

    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondNumber) {
        operator = nextOperator;
        return;
    }

    if (firstNumber === null) {
        firstNumber = inputValue;
    }

    else if (operator) {
        const result = performCalculation(
            firstNumber,
            inputValue,
            operator
        );

        currentInput = String(result);

        firstNumber = result;
    }

    operator = nextOperator;

    waitingForSecondNumber = true;

    previous.textContent =
        `${firstNumber} ${getOperatorSymbol(nextOperator)}`;

    updateDisplay();
}


// Calculation

function performCalculation(first, second, operator) {

    switch (operator) {

        case "+":
            return first + second;

        case "-":
            return first - second;

        case "*":
            return first * second;

        case "/":
            if (second === 0) {
                return "Error";
            }

            return first / second;

        default:
            return second;
    }
}


// Equal button

function calculate() {

    if (operator === null || firstNumber === null) {
        return;
    }

    const secondNumber = parseFloat(currentInput);

    const result = performCalculation(
        firstNumber,
        secondNumber,
        operator
    );

    previous.textContent =
        `${firstNumber} ${getOperatorSymbol(operator)} ${secondNumber} =`;

    currentInput = String(result);

    firstNumber = null;
    operator = null;

    waitingForSecondNumber = true;

    updateDisplay();
}



// Percentage

function percentage() {

    let number = parseFloat(currentInput);

    number = number / 100;

    currentInput = String(number);

    updateDisplay();
}


// Delete

function deleteLast() {

    if (currentInput.length === 1) {
        currentInput = "0";
    }

    else {
        currentInput =
            currentInput.slice(0, -1);
    }

    updateDisplay();
}


// Clear

function clearDisplay() {

    currentInput = "0";

    firstNumber = null;

    operator = null;

    waitingForSecondNumber = false;

    previous.textContent = "";

    updateDisplay();
}


// Operator symbols

function getOperatorSymbol(operator) {

    switch (operator) {

        case "+":
            return "+";

        case "-":
            return "−";

        case "*":
            return "×";

        case "/":
            return "÷";

        default:
            return operator;
    }
}