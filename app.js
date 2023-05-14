const screen = document.querySelector(".display"); 
const r = document.querySelector(":root");
const checkbox = document.getElementById("checkbox");
let operation = document.querySelector(".operation");
let buffer = "0";
let result;
let negate;
let prevOperator, currOperator;
let arithmetics = ["÷", "×", "−", "+"];

checkbox.addEventListener("click", function () {
    checkbox.checked? darkMode(): lightMode();
})

document.querySelector(".calc-btns").addEventListener("click", function (event) {
    handleButtons(event.target.innerText);
})

const handleButtons = (value) => {
    isNaN(parseInt(value)) ? handleSymbols(value): handleNumbers(value);
}

const handleNumbers = (value) => {
    if (currOperator == "=" && prevOperator == undefined) {
        buffer = value;
        operation.innerText = "";
        currOperator = undefined;
    } else if (buffer === "0") {
        if (value == "00") {
            buffer = "0"
        } else {
            buffer = value;
        }
    } else {
        buffer += value;
    }
    screen.innerText = buffer;
}

const handleSymbols = (value => {
    if (arithmetics.includes(value)) {
        if (prevOperator === undefined) {
            if (value == "−") {
                if (buffer == "-") {
                    return;
                }

                if (buffer == "0") {
                    buffer = "-";
                    screen.innerText = buffer;
                } else {        
                    prevOperator = value;
                    result = parseFloat(buffer);
                    buffer = "0";
                    screen.innerText = buffer;
                    operation.innerText = result + " " + value;
                }
            } else if (buffer == "0" || buffer == "-") {
                return;
            } else {
                negate = false;
                prevOperator = value;
                result = parseFloat(buffer);
                buffer = "0";
                screen.innerText = buffer;
                operation.innerText = result + " " + value;
            }
        } else {
            if (value == "−") {
                if (buffer == "-") {
                    return;
                }

                if (screen.innerText == "0") {
                    buffer = "-";
                    screen.innerText = buffer;
                } else if (buffer == "0" || buffer == "-") {
                    return;
                } else {
                    negate = false;
                    currOperator = value
                    handleArithmetics(parseFloat(buffer));
                    operation.innerText = result + " " + currOperator;
                    prevOperator = value;
                    buffer = "0"
                    screen.innerText = "0";
                }
            } else if (buffer == "0" || buffer == "-") {
                return;
            } else {
                currOperator = value
                handleArithmetics(parseFloat(buffer));
                operation.innerText = result + " " + currOperator;
                prevOperator = value;
                buffer = "0"
                screen.innerText = "0";
            }
        }
    } else if (value === "C") {
        reset()
    } else if (value === "←") {
        if (currOperator == "=" && prevOperator == undefined) {
            reset()
        } else {
            let cache = buffer.split("")
            cache.splice(cache.length - 1);
            buffer = cache.join("");
            if (buffer == "-") {
                negate = false;
                buffer = "0";
            }
            if (buffer == "") {
                buffer = "0";
            }
            screen.innerText = buffer
        }
    } else if (value == "=") {
        if (prevOperator == undefined || buffer == "-" || buffer == "0") {
            return;
        }
        operation.innerText = result + " " + prevOperator + " " + buffer + " " + "=";
        handleArithmetics(parseFloat(buffer));
        buffer = result;
        screen.innerText = result;
        if (screen.innerText.length > 10) {
            result > 9999999999? result = result.toExponential(3):result = result.toFixed(4);
        }
        buffer = result;
        screen.innerText = buffer;
        console.log(screen.innerText)
        currOperator = value;
        prevOperator = undefined;
    } else if (value == ".") {
        if (buffer.includes(value)) {
            return;
        }
        buffer == "0"? buffer = "0.": buffer += value;
        screen.innerText = buffer;
    }
})

const handleArithmetics = (value) => {
    switch (prevOperator) {
        case "+":
            result += value;
            prevOperator = undefined;
            break;
        case "−":
            result -= value;
            prevOperator = undefined;
            break;
        case "×":
            result *= value;
            prevOperator = undefined;
            break;
        case "÷":
            result /= value;
            prevOperator = undefined;
            break;
    }
}

const reset = () => {
    screen.innerText = "0";
    buffer = "0";
    operation.innerText = "";
    result = 0;
    prevOperator = undefined;
    currOperator = undefined;
    negate = false;
}

const darkMode = () => {
    r.style.setProperty('--background', '#242424');
    r.style.setProperty('--calculator', '#424557');
    r.style.setProperty('--screen', '#2cb337b8');
    r.style.setProperty('--btns', '#646464');
    r.style.setProperty('--reset', '#cf6679');
    r.style.setProperty('--opr', '#c4651c');
    r.style.setProperty('--text', '#dee4e7');

}

const lightMode = () => {
    r.style.setProperty('--background', '#dee4e7');
    r.style.setProperty('--calculator', '#545454');
    r.style.setProperty('--screen', '#75dd7e61');
    r.style.setProperty('--btns', '#d0d0d0');
    r.style.setProperty('--reset', '#df4a65');
    r.style.setProperty('--opr', '#f06d06');
    r.style.setProperty('--text', '#121212');

}