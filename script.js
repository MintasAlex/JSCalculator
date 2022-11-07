function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case ("+"):
            return a + b;
        case ("-"):
            return a - b;
        case ("X"):
            return a * b;
        case ("/"):
            return a / b;
        case ("%"):
            return a % b;
        default:
            return "ERROR";
    }
}

const userInputDisplay = document.querySelector("#user-input");
function updateUserInput() {
    userInputDisplay.textContent = query;
}

function processQuerry() {
    let temp = query.split(" ");
    let temp2;
    if (temp[0] == "-") {
        //temp2 = temp[1];
        temp = temp.slice(1);
        temp[0] = "-" + temp[0]
    }
    while (temp.length > 1) {
        temp2 = operate(temp[0], temp[2], temp[1]);
        temp = temp.slice(3);
        temp.unshift(temp2);
    }
    query = "0";
    if (isNaN(temp[0])) {
        return "ERROR";
    } else {
        return Math.round(temp[0] * 100) / 100;
    }
}

//all the buttons
const digitBtns = document.querySelectorAll("button.digitBtn");
const operatorBtns = document.querySelectorAll("button.operatorBtn");
const equalsBtn = document.querySelector("#equals-button");
const periodBtn = document.querySelector("#period-button");
const clearBtn = document.querySelector("#c-button");
const clearEntryBtn = document.querySelector("#ce-button");

//menu actions
let query = "0";
const digits = "0123456789";
const operators = "+-X/%";

digitBtns.forEach(btn => btn.addEventListener('click', () => {
    if (query == "0") {
        query = btn.textContent;
    } else if (operators.includes(query[query.length - 2])) {
        query += btn.textContent;
    } else {
        query += btn.textContent;
    }
    updateUserInput();
}));

operatorBtns.forEach(btn => btn.addEventListener('click', () => {
    if (query == "0" && resultDisplay.textContent != "\u00A0" && resultDisplay.textContent != "ERROR") {
        query = resultDisplay.textContent + " " + btn.textContent + " ";
    } else if (query == "0" && btn.textContent == "-") {
        query = btn.textContent + " ";
    } else if (operators.includes(query[query.length - 2])) {
        query = query.slice(0, -2) + btn.textContent + " ";
    } else {
        query += " " + btn.textContent + " ";
    }
    updateUserInput();
}));

periodBtn.addEventListener('click', () => {
    let temp = query.split(" ");
    if (temp[temp.length - 1].includes(".")) {
        // updateUserInput();
    } else if (query == 0) {
        query = "0.";
    } else if (operators.includes(query[query.length - 2])) {
        query += "0.";
    } else {
        query += ".";
    }
    updateUserInput();
});

clearBtn.addEventListener('click', () => {
    query = "0";
    updateUserInput();
    resultDisplay.textContent = "\u00A0";
});

clearEntryBtn.addEventListener('click', () => {
    if (query != "0" && !operators.includes(query[query.length - 2])) {
        let temp = query.split(" ");
        temp.splice(-1);
        query = temp.join(" ") + " ";
        updateUserInput();
    }
});

const resultDisplay = document.querySelector("#result");

equalsBtn.addEventListener('click', () => {
    resultDisplay.textContent = processQuerry();
});



