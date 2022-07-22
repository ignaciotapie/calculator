function add(a,b){ return a+b }
function subtract(a,b){ return a-b }
function multiply(a,b){ return a*b }
function divide(a,b){ return variable = (b != 0) ?  a/b : "Haha, funny guy.";}
function operate(a,b,operator)
{
    console.log("Cuenta: " + a + operator + b);
    switch (operator)
    {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            console.log("function operate: Something went terribly wrong. Operator is: " + String(operator));
        break;
    }
}

const states = {
    INSERT: "insert",
    NEWOP: "check",
}

function main(){
    const display = document.querySelector(".calculator-result");
    const numberButtons = document.querySelectorAll(".numbers .button");
    const symbolButtons = document.querySelectorAll(".symbols .button");
    const equalButton = document.querySelector("#Equal");
    const restartButton = document.querySelector("#Restart");

    let pressedEqualLast = false;
    let pressedSymbolLast = false;

    let actualState = states.INSERT;
    const getDisplayNumber = function () {
        return parseFloat(display.textContent);
    };

    let buffer = [0, "+", 0];


    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (actualState == states.INSERT)
                display.textContent = getDisplayNumber() * 10 + parseFloat(button.textContent);
            else if (actualState == states.NEWOP){
                display.textContent = parseFloat(button.textContent);
                actualState = states.INSERT;
            }
        })
    })

    symbolButtons.forEach(button => {
        button.addEventListener("click", () => {
            actualState = states.NEWOP;
            if (pressedSymbolLast)
            {
                buffer[2] = getDisplayNumber();
                display.textContent = operate(buffer[0], buffer[2], buffer[1]);
            }
            buffer[0] = getDisplayNumber();
            buffer[1] = button.textContent;
            pressedSymbolLast = true;
            pressedEqualLast = false;
        })
    })

    equalButton.addEventListener("click", () => {
        actualState = states.NEWOP;
        if (!pressedEqualLast)
        {
            buffer[2] = getDisplayNumber();
            pressedEqualLast = true;
        }
        else
        {
            buffer[0] = getDisplayNumber();
        }
        pressedSymbolLast = false;
        display.textContent = operate(buffer[0], buffer[2], buffer[1]);
    })

    restartButton.addEventListener("click", () =>{
        actualState = states.INSERT;
        pressedEqualLast = false;
        pressedSymbolLast = false;
        display.textContent = 0;
        buffer = [0, "+", 0];
    })

}


main();