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
        if (calculator.number2String) {
            compressExpression();
            calculator.operator = operator.value;
            updateExpression();
        }
        updateCalculatorOperator(`${operator.value}`);
    }), false
})

function useOperator() {

}

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
    if (calculator.operator && calculator.operator !== '!' && calculator.number2String.length < 11) {
        calculator.number2String += inputNumber;
    } else if ((!calculator.operator) && (calculator.number1String.length < 11)) {
        calculator.number1String += inputNumber;
    }
    updateExpression();
}

document.addEventListener('keydown', function (event) {
    if (event.key === '0') {
        updateCalculatorNumberStrings(0);
    } else if (event.key === '1') {
        updateCalculatorNumberStrings(1);
    } else if (event.key === '2') {
        updateCalculatorNumberStrings(2);
    } else if (event.key === '3') {
        updateCalculatorNumberStrings(3);
    } else if (event.key === '4') {
        updateCalculatorNumberStrings(4);
    } else if (event.key === '5') {
        updateCalculatorNumberStrings(5);
    } else if (event.key === '6') {
        updateCalculatorNumberStrings(6);
    } else if (event.key === '7') {
        updateCalculatorNumberStrings(7);
    } else if (event.key === '8') {
        updateCalculatorNumberStrings(8);
    } else if (event.key === '9') {
        updateCalculatorNumberStrings(9);
    } else if (event.key === '.') {
        addDecimal();
    } else if (event.key === 'Backspace') {
        backspace();
    } else if (event.key === 'Delete') {
        clearCalculator();
    } else if (event.key === 'Enter') {
        calculator.result = operate();
        updateResult();
    } else if (event.key === '*') {
        if (calculator.number2String) {
            compressExpression();
            calculator.operator = '\u00D7';
            updateExpression();
        }
        updateCalculatorOperator(`\u00D7`);
    } else if (event.key === '/') {
        if (calculator.number2String) {
            compressExpression();
            calculator.operator = '\u00F7';
            updateExpression();
        }
        updateCalculatorOperator(`\u00F7`);
    } else if (event.key === '-') {
        if (calculator.number2String) {
            compressExpression();
            calculator.operator = '\u2212';
            updateExpression();
        }
        updateCalculatorOperator(`\u2212`);
    } else if (event.key === '+') {
        if (calculator.number2String) {
            compressExpression();
            calculator.operator = '+';
            updateExpression();
        }
        updateCalculatorOperator(`+`);
    }
});

function compressExpression() {
    calculator.result = operate();
    updateResult();
    calculator.number2String = '';
    calculator.number2HasDecimal = false;
    calculator.number1String = calculator.result;
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
    updateResult();
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
        calculator.number1String = String(calculator.number1String).slice(0, -1);
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
    let answer = +(number1 + number2).toPrecision(6);
    if (String(answer).length > 10) { answer = answer.toExponential(); }
    return answer;
}

function subtract(number1, number2) {
    let answer = +(number1 - number2).toPrecision(6);
    if (String(answer).length > 10) { answer = answer.toExponential(); }
    return answer;
}

function multiply(number1, number2) {
    let answer = +(number1 * number2).toPrecision(6);
    if (String(answer).length > 10) { answer = answer.toExponential(); }
    return answer;
}

function divide(number1, number2) {
    if (number2 === 0) {
        alert("Did you REALLY try to divide by 0?")
    } else {
        let answer = +(number1 / number2).toPrecision(6);
        if (String(answer).length > 10) { answer = answer.toExponential(); }
        return answer;
    }
}

function power(number1, number2) {
    let answer = +(number1 ** number2).toPrecision(6);
    if (String(answer).length > 10) { answer = answer.toExponential(); }
    return answer;
}

function factorial(number1) {
    if (number1 > 170) {
        return Infinity;
    } else if (number1 < 0) {
        alert('Cannot take factorial of negative number');
    } else if (!Number.isInteger(number1)) {
        alert('Sorry, only integers allowed with this factorial operation!');
    } else if (number1 === 0) {
        return 1;
    } else if (number1 === 1) {
        return 1;
    } else {
        let answer = number1 * factorial(number1 - 1);
        answer = +answer.toPrecision(6);
        if (String(answer).length > 10) { answer = answer.toExponential(); }
        return answer;
    }
}

// ************** Evaluation Functions **************
const result = document.getElementById('result');

const equalsSign = document.getElementById('equals-sign');
equalsSign.addEventListener('click', () => {
    if (calculator.operator !== '!') {
        if (!calculator.number2String) { return; }
    }
    calculator.result = operate();
    updateResult();
});

function operate() {
    const number1 = Number(calculator.getNumber1String());
    const number2 = Number(calculator.getNumber2String());
    const operator = calculator.getOperator();

    if (operator === '+') {
        return add(number1, number2);
    } else if (operator === '\u2212') {
        return subtract(number1, number2);
    } else if (operator.normalize() === '\u00D7'.normalize()) {
        return multiply(number1, number2);
    } else if (operator === '\u00F7') {
        return divide(number1, number2);
    } else if (operator === '^') {
        return power(number1, number2);
    } else if (operator === '!') {
        return factorial(number1);
    } else if (operator === '') {
        return number1;
    }
}