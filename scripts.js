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

function exponentiation(number1) {
    return Math.E ** number1;
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
