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

    number1: Number(this.number1String),
    getNumber1: function () {
        return this.number1;
    },

    number2String: '',
    getNumber2String: function () {
        return this.number2String;
    },

    number2: Number(this.number2String),
    getNumber2: function () {
        return this.number2;
    },

    number1HasDecimal: false,
    number2HasDecimal: false,


    operator: '',

    expression: '',

    result: '',
}

// ************** Display Functions **************
const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        updateCalculatorNumberStrings(String(number.value))
    }), false
});

const binaryOperators = document.querySelectorAll('.binary-operator');
binaryOperators.forEach((binaryOperator) => {
    binaryOperator.addEventListener('click', () => {
        updateCalculatorOperator(` ${binaryOperator.value} `);
    }), false
})

function updateCalculatorOperator(operatorSymbol) {
    if (calculator.number1String && !calculator.number2String) {
        calculator.operator += operatorSymbol;
    }
    updateExpression();
}

function updateCalculatorNumberStrings(inputNumber) {
    if (calculator.operator) {
        calculator.number2String += inputNumber;
    } else if (!calculator.operator) {
        calculator.number1String += inputNumber;
    }
    updateExpression();
}

function updateExpression() {
    const expression = document.getElementById('expression');
    expression.textContent = `${calculator.number1String} 
        ${calculator.operator} ${calculator.number2String}`;
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
    calculator.number2String = '';
    calculator.number2 = '';
    calculator.operator = '';
    calculator.expression = '';
    calculator.result = '';
    updateExpression();
}

const backspaceButton = document.getElementById('backspace-button');
backspaceButton.addEventListener('click', () => {
    backspace();
});

function backspace() {
    if (calculator.number2String) {
        calculator.number2String = calculator.number2String.slice(0, -1);
    } else if (calculator.operator) {
        calculator.operator = '';
    } else if (calculator.number1String) {
        calculator.number1String = calculator.number1String.slice(0, -1);
    }
    updateExpression();
}
// ************** Operation Functions **************
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

function negateNumber(number1) {
    if (number1 === 0) {
        return 0;
    } else {
        return -number1;
    }
}
