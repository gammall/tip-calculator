const tipAmounts = [5, 10, 15, 25, 50, { text: "custom", value: 0 }];
const tips = document.getElementById("tips");
const numberOfPeopleInput = document.getElementById("numberOfPeople");
const billInput = document.getElementById("bill");
const totalElement = document.getElementById("total");
const tipAmountElement = document.getElementById("tipAmount");
const resetButton = document.getElementById("reset");
let selectedTip;
let numberOfPeople;
let bill;

totalElement.innerText = "$0";
tipAmountElement.innerText = "$0";

tipAmounts.forEach((el, i) => {
  if (typeof el === "number") {
    const button = document.createElement("button");

    button.addEventListener("click", (e) => {
      setActiveClasses(i);
      selectedTip = el;
      calculateTip();
    });
    button.innerText = `${el}%`;
    button.classList.add("btn");
    tips.appendChild(button);
  } else if (typeof el === "object") {
    const input = document.createElement("input");
    input.addEventListener("keyup", (e) => {
      selectedTip = input.value;

      setTimeout(() => {
        calculateTip();
      }, 1000);
    });
    input.placeholder = el.text;
    tips.appendChild(input);
  }
});

numberOfPeopleInput.addEventListener("keyup", () => {
  numberOfPeople = numberOfPeopleInput.value;
  calculateTip();
});

billInput.addEventListener("keyup", () => {
  bill = billInput.value;
  calculateTip();
});

resetButton.addEventListener("click", () => reset());

function setActiveClasses(clickedButton) {
    buttons = document.getElementsByClassName("btn")

    for (button of buttons) {
        if (buttons[clickedButton] === button) {
            button.classList.add("btn-active")
        } else {
            button.classList.remove("btn-active")
        }
    }
}

function calculateTip() {
  if (!bill || !selectedTip) return;
  const people = numberOfPeople ? numberOfPeople : 1;
  const tipAmount = (selectedTip / 100) * bill;
  const total = Number(bill) + tipAmount;

  const totalPerPerson = total / people;
  const tipAmountPerPerson = tipAmount / people;

  totalElement.innerText = `$${totalPerPerson.toFixed(2)}`;
  tipAmountElement.innerText = `$${tipAmountPerPerson.toFixed(2)}`;
}

function reset() {
  selectedTip = 0;
  numberOfPeopleInput.value = undefined;
  billInput.value = undefined;
  numberOfPeople = 0;
  bill = 0;

  totalElement.innerText = "$0";
  tipAmountElement.innerText = "$0";

  const buttons = document.getElementsByClassName("btn-active");

  for (button of buttons) {
    if (button) {
      button.classList.remove("btn-active");
    }
  }
}

