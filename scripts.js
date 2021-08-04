// ************** Dark and Light Mode Functions **************
const darkModeController = document.querySelector('#dark-mode-controller');
darkModeController.addEventListener('click', () => toggleLightMode());

function toggleLightMode() {
    const body = document.querySelector('body');
    body.classList.toggle('light-mode');

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.toggle('light-mode');
    });

    const calculator = document.getElementById('calculator');
    calculator.classList.toggle('light-mode')

    const expression = document.getElementById('expression');
    expression.classList.toggle('light-mode');

    const overallPageContainer = document.getElementById('overall-page-container');
    overallPageContainer.classList.toggle('light-mode');

    const result = document.getElementById('result');
    result.classList.toggle('light-mode');

}

// ************** Calculator Object **************
const calculator = {
    number1String: '',
    getNumber1String: function () {
        return this.number1String;
    },

    number2String: '',
    getNumber2String: function () {
        return this.number2String;
    },

    number1IsNegative: false,
    number2IsNegative: false,

    number1HasDecimal: false,
    number2HasDecimal: false,

    operator: '',

    getOperator: function () {
        return this.operator;
    },

    result: '',
}

// ************** Display Functions **************
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        updateCalculatorNumberStrings(String(number.value));
    }), false
});

const operators = document.querySelectorAll('.binary-operator, #factorial-operator');
operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        updateCalculatorOperator(`${operator.value}`);
    }), false
})

function updateCalculatorOperator(operatorSymbol) {
    if (calculator.number1String && !calculator.number2String &&
        !calculator.operator) {
        if (operatorSymbol === '!' && (calculator.number1HasDecimal || calculator.number1IsNegative)) {
            return;
        }
        calculator.operator += operatorSymbol;
    }
    updateExpression();
}

function updateCalculatorNumberStrings(inputNumber) {
    if (calculator.operator && calculator.operator !== '!') {
        calculator.number2String += inputNumber;
    } else if (!calculator.operator) {
        calculator.number1String += inputNumber;
    }
    updateExpression();
}

const decimalButton = document.getElementById('decimal');
decimalButton.addEventListener('click', () => { addDecimal(); });

function addDecimal() {
    if (calculator.operator && calculator.operator !== '!' && !calculator.number2HasDecimal) {
        calculator.number2HasDecimal = true;
        calculator.number2String += '.';
    } else if (!calculator.operator && !calculator.number1HasDecimal) {
        calculator.number1HasDecimal = true;
        calculator.number1String += '.';
    }
    updateExpression();
}

function updateExpression() {
    const expression = document.getElementById('expression');
    expression.textContent = `${calculator.number1String} ${calculator.operator} ${calculator.number2String}`;
}

function updateResult() {
    const result = document.getElementById('result');
    result.textContent = `${calculator.result}`;
}

const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => { clearCalculator() });

function clearCalculator() {
    calculator.number1String = '';
    calculator.number1 = '';
    calculator.number1IsNegative = false;
    calculator.number1HasDecimal = false;
    calculator.number2String = '';
    calculator.number2 = '';
    calculator.number2IsNegative = false;
    calculator.number2HasDecimal = false;
    calculator.operator = '';
    calculator.result = '';
    updateExpression();
}

const backspaceButton = document.getElementById('backspace-button');
backspaceButton.addEventListener('click', () => {
    backspace();
});

function backspace() {
    if (calculator.number2String) {
        if (calculator.number2String[calculator.number2String.length - 1] === '.') {
            calculator.number2HasDecimal = false;
        }
        calculator.number2String = calculator.number2String.slice(0, -1);
    } else if (calculator.operator) {
        calculator.operator = '';
    } else if (calculator.number1String) {
        if (calculator.number1String[calculator.number1String.length - 1] === '.') {
            calculator.number1HasDecimal = false;
        }
        calculator.number1String = calculator.number1String.slice(0, -1);
    }
    updateExpression();
}

const negateOperator = document.getElementById('negate-operator');
negateOperator.addEventListener('click', () => { negateNumber(); });

function negateNumber() {
    if (calculator.operator && calculator.operator !== '!') {
        if (!calculator.number2IsNegative) {
            calculator.number2String = '-' + calculator.number2String;
            calculator.number2IsNegative = true;
        } else if (calculator.number2IsNegative) {
            calculator.number2String = calculator.number2String.slice(1);
            calculator.number2IsNegative = false;
        }
    } else if (calculator.operator !== '!') {
        if (!calculator.number1IsNegative) {
            calculator.number1IsNegative = true;
            calculator.number1String = '-' + calculator.number1String;
        } else if (calculator.number1IsNegative) {
            calculator.number1IsNegative = false;
            calculator.number1String = calculator.number1String.slice(1);
        }
    }
    updateExpression();
}

// ************** Mathematical Functions **************
function add(number1, number2) {
    return number1 + number2;
}

function subtract(number1, number2) {
    return number1 - number2;
}

function multiply(number1, number2) {
    return number1 * number2;
}

function divide(number1, number2) {
    if (number2 === 0) {
        return "Did you REALLY divide by 0?"
    } else {
        return number1 / number2;
    }
}

function power(number1, number2) {
    return number1 ** number2;
}

function factorial(number1) {
    if (number1 === 0) {
        return 1;
    } else if (number1 === 1) {
        return 1;
    } else {
        return number1 * factorial(number1 - 1);
    }
}

// ************** Evaluation Functions **************
