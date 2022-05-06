const caclulatorDisplay = document.querySelector("h1");

const inputBtns = document.querySelectorAll("button");

const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

//calculating everything, final step

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

function sendNumberValue(number) {
  if (awaitingNextValue === true) {
    caclulatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = caclulatorDisplay.textContent;
    caclulatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

//add event listeners for numbers operators and decimals

function resetAll() {
  caclulatorDisplay.textContent = "0";

  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
}

function addDecimal() {
  if (awaitingNextValue === true) return;
  if (!caclulatorDisplay.textContent.includes(".")) {
    caclulatorDisplay.textContent = `${caclulatorDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(caclulatorDisplay.textContent);
  //prevent multiple operators
  if (operatorValue && awaitingNextValue === true) {
    operatorValue = operator;
    return;
  }

  //assign first value if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);

    caclulatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", function () {
      sendNumberValue(inputBtn.value);
    });
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", function () {
      useOperator(inputBtn.value);
    });
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

clearBtn.addEventListener("click", resetAll);
