const mortgageForm = document.querySelector("form");
const clearAll = document.querySelector(".clear-form");
const amount = document.querySelector("#mortage-amount");
const term = document.querySelector("#mortage-term");
const rate = document.querySelector("#mortage-rate");
const repayment = document.querySelector("#repayment");
const interestOnly = document.querySelector("#only");
const cartTypes = document.querySelectorAll(".cart-type ul li");
const cartMortgage = document.querySelector('.cart-type ul');
const radioBtn = document.querySelectorAll("[type='radio']");
const mortgageTypes = document.getElementsByName('mortgage-type');
const cartCalculate = document.querySelector(".cart__calculate");
const resultRepayments = document.querySelector(".result");
const resultTotal = document.querySelector(".result__mortgage");
const cartTypesParrent = document.querySelector(".cart-type");

// Валидация полей ввода суммы, времени и процентов
function validateInputs(event) {
  const amountVal = amount.value.trim();
  const termVal = term.value.trim();
  const rateVal = rate.value.trim();

  let success = true;

  if (amountVal === "") {
    success = false;
    setError(amount, "This field is required");
  } else {
    setSucces(amount);
  }
  if (termVal === "") {
    success = false;
    setError(term, "This field is required");
  } else {
    setSucces(term);
  }
  if (rateVal === "") {
    success = false;
    setError(rate, "This field is required");
  } else {
    setSucces(rate);
  }
  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}
function setSucces(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");

  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

// Валидация радио-кнопок
/*перебираются радио-кнопки и если радио-кнопка имеет checked
 * тода удаляется класс error
* если не не валид то есть радио-кнопка не checked 
* класс об ошибке добавляется
 */
function validateRadio() {
  const msgError = document.querySelector(".cart-type p");
  var btnValid = false;
  for (var i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      btnValid = true;
      cartTypesParrent.classList.remove('error');
      break;
    }
  }
  if (!btnValid) {
    cartTypesParrent.classList.add('error');
    return false;
   }
}

cartCalculate.addEventListener('click', validateRadio);

cartCalculate.addEventListener("click", (event) => {
  if (!validateInputs()) {
    event.preventDefault();
  }
});

// Рассчет ипотечного калькулятора и используется 
// для знаков библиотека http://numeraljs.com/
// Ипотечный калькулятор был взят с https://w3programmings.com/build-a-mortgage-calculator-using-javascript/

function calculateMortgage(event) {
  event.preventDefault();

  if (repayment.parentElement.parentElement.classList.contains("focus")) {
    // const mortgageAmount = parseFloat(numeral(amount.value).format('0,0'));
    const mortgageAmount = parseFloat(amount.value);
    const mortgageRate = parseFloat(rate.value) / 100 / 12;
    const temrMonths = parseFloat(term.value) * 12;
    const monthlyRepayments =
      (mortgageAmount * mortgageRate) /
      (1 - Math.pow(1 + mortgageRate, -temrMonths));
    const totalPayments = monthlyRepayments * 12 * parseFloat(term.value);

    resultRepayments.innerText = `£${numeral(monthlyRepayments).format(
      "0,0.00"
    )}`;
    resultTotal.innerText = `£${numeral(totalPayments).format("0,0.00")}`;
    document.querySelector(".cart__right-default").classList.add("active");
    document.querySelector(".cart__right-result").classList.add("active");
  } else if (
    interestOnly.parentElement.parentElement.classList.contains("focus")
  ) {
    const mortgageAmount = parseFloat(amount.value);
    const mortgageRate = parseFloat(rate.value) / 100;

    const monthlyPayment = (mortgageRate * mortgageAmount) / 12;
    const yearPayment = monthlyPayment * 12;

    resultRepayments.innerText = `£${numeral(monthlyPayment).format("0,0.00")}`;
    resultTotal.innerText = `£${numeral(yearPayment).format("0,0.00")}`;
    document.querySelector(".cart__right-default").classList.add("active");
    document.querySelector(".cart__right-result").classList.add("active");
  }
}

cartCalculate.addEventListener("click", calculateMortgage);

// переключение радио-кнопок
// при клике по радио-кнопке добавляется класс focus
// focus изменяет css-свойства
cartTypes.forEach((cartType) => {
  cartType.addEventListener("click", () => {
    cartTypes.forEach((radio) => radio.classList.remove("focus"));
    cartType.classList.add("focus");
  });
});

// очистка данных
clearAll.addEventListener("click", (event) => {
    event.preventDefault();
  mortgageForm.reset();
  repayment.parentElement.parentElement.classList.remove("focus");
  interestOnly.parentElement.parentElement.classList.remove("focus");
  document.querySelector(".cart__right-default").classList.remove("active");
  document.querySelector(".cart__right-result").classList.remove("active");
  cartTypesParrent.classList.remove('error');
  amount.classList.remove('error')

});


