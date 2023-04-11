export const calc = () => {
  const form = document.querySelector('#form-calc');
  const num1 = form.querySelector('#x');
  const num2 = form.querySelector('#y');
  const btnPlus = form.querySelectorAll('.calc__btn')[0];
  const btnMinus = form.querySelectorAll('.calc__btn')[1];
  const btnMultiply = form.querySelectorAll('.calc__btn')[2];
  const btnDivide = form.querySelectorAll('.calc__btn')[3];
  const result = form.querySelector('.calc__result');

  const plus = () => {
    result.textContent = +num1.value + +num2.value;
    form.reset();
  };

  const minus = () => {
    result.textContent = +num1.value - +num2.value;
    form.reset();
  };

  const multiply = () => {
    result.textContent = Math.floor(+num1.value * +num2.value * 100) / 100;

    form.reset();
  };

  const divide = () => {
    result.textContent = Math.floor((+num1.value / +num2.value) * 100) / 100;
    form.reset();
  };

  btnPlus.addEventListener('click', plus);
  btnMinus.addEventListener('click', minus);
  btnMultiply.addEventListener('click', multiply);
  btnDivide.addEventListener('click', divide);
};
