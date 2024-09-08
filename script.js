

document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.querySelector('.display');
    const buttons = Array.from(document.getElementsByClassName('buttNUM'));
    const buttOPP = Array.from(document.getElementsByClassName('buttOPP'));
    const buttCLR = document.querySelector('.buttCLR');
    const buttEQ = document.querySelector('.buttoneq');
    const buttPI = document.querySelector('.buttPI');
    let clearss = false

    let currentInput = '';
    let operator = '';
    let firstValue = '';

    // Clear the display and reset values
    buttCLR.addEventListener('click', () => {
        displayElement.textContent = '';
        currentInput = '';
        operator = '';
        firstValue = '';
    });

    // Handle operator button clicks
    for (let i = 0; i < buttOPP.length; i++) {
        const element = buttOPP[i];
        element.addEventListener('click', () => {
            if (currentInput !== '') {
                // Convert π to Math.PI if needed
                if (currentInput === 'π') {
                    currentInput = Math.PI;
                }
                firstValue = (firstValue === 'π') ? Math.PI : parseFloat(currentInput);
                operator = element.textContent;
                displayElement.textContent += ` ${operator} `;
                currentInput = '';
            }
        });
    }

    // Handle number button clicks
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener('click', () => {
            displayElement.textContent += button.textContent;
            currentInput = displayElement.textContent.split(/[\+\-\*\/]/).pop().trim();
            if (clearss) {
                displayElement.textContent = ''
                clearss = false
            }
        });
    }

    // Handle pi button click
    buttPI.addEventListener('click', () => {
        displayElement.textContent += 'π';
        currentInput = displayElement.textContent.split(/[\+\-\*\/]/).pop().trim();
    });

    // Perform the calculation on "=" button click
    buttEQ.addEventListener('click', () => {
        if (firstValue !== '' && currentInput !== '' && operator !== '') {
            let result;
            let num1 = (firstValue === 'π') ? Math.PI : parseFloat(firstValue);
            let num2 = (currentInput === 'π') ? Math.PI : parseFloat(currentInput);

            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
                case '%':
                    result = num1 % num2;
                    break;
                default:
                    result = 'Error';
            }

            displayElement.textContent = `${result}`;
            currentInput = result;
            operator = '';
            firstValue = '';
            clearss = true;
        }
    });
});
