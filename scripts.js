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