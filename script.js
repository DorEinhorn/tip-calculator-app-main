"use strict";

const billInput = document.querySelector("#bill-input");
const customTipInput = document.querySelector(".tip-custom");
const numberOfPeopleInput = document.querySelector("#number-of-people-input");
const tipAmountValue = document.querySelector("#tip-amount");
const totalValue = document.querySelector("#total-amount");
const btnReset = document.querySelector(".btn-reset");
const selectTipBtns = document.querySelectorAll(".tips");

btnReset.addEventListener("click", (event) =>{
    billInput.value = "0";
    customTipInput.value = "";
    numberOfPeopleInput.value = "1";
    tipAmountValue.innerHTML = "$0";
    totalValue.innerHTML = "$0";

    selectTipBtns.forEach((tipBtn) =>{
        tipBtn.classList.remove("active");
    });
});

selectTipBtns.forEach((btn) =>{
    btn.addEventListener("click", (event) =>{
        selectTipBtns.forEach((tipBtn) =>{
            tipBtn.classList.remove("active");
        });

        if(event.target.classList.contains("tip-custom")){
            event.target.parentElement.classList.add("active");
        } else {
          event.target.classList.add("active");
        }
        calculateTip();
    });
});

const calculateTip = () => {
    const billValue = parseFloat(billInput.value);
    const numberOfPeople = parseFloat(numberOfPeopleInput.value);
    const customTipActive = document.querySelector(".select-tip-custom.active");
    let tipPercentage = parseInt(document.querySelector(".tips.active")?.dataset.percentage || 0);

    if (customTipActive) {
        tipPercentage = parseFloat(document.querySelector(".tip-custom").value);
    }

    if (isNaN(billValue) || isNaN(numberOfPeople) || isNaN(tipPercentage) || billValue <= 0 || numberOfPeople <= 0 || tipPercentage < 0) {
        tipAmountValue.innerHTML = "$0";
        totalValue.innerHTML = "$0";
        return;
    }

    const totalAmount = parseFloat((tipPercentage / 100) * billValue).toFixed(2);
    const tipAmount = parseFloat(totalAmount / numberOfPeople).toFixed(2);
    const actualTotalAmount = parseFloat((billValue + parseFloat(totalAmount)) / numberOfPeople).toFixed(2);

    tipAmountValue.innerHTML = `$${tipAmount}`;
    totalValue.innerHTML = `$${actualTotalAmount}`;
};

const isNumber = (value) => {
    if (
        value === "Backspace" ||
        value === "ArrowLeft" ||
        value === "ArrowRight" ||
        value === "."
      ) {
        return true;
      }
      const regex = /^[0-9]+$/;

  return regex.test(value);
}

billInput.addEventListener("keyup", (event) => {
    calculateTip();
  });
  customTipInput.addEventListener("keyup", (event) => {
    calculateTip();
  });
  numberOfPeopleInput.addEventListener("keyup", (event) => {
    calculateTip();
  });

  billInput.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });
  customTipInput.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });
  numberOfPeopleInput.addEventListener("keydown", (event) => {
    if (!isNumber(event.key)) {
      event.preventDefault();
    }
  });