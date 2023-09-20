const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const cvcInput = document.getElementById('cvc');

const nameOutput = document.querySelector('.card-name');
const numberOutput = document.querySelector('.card-number');
const dateOutput = document.querySelector('.card-date');
const cvcOutput = document.querySelector('.card-cvc');
const secondaryButton = document.querySelector('.btn-2')

const form = document.getElementById('card-form');

const formPage = document.querySelector('.form-wrapper');
const accessPage = document.querySelector('.access-container');

nameInput.addEventListener("keyup", (e) => {
   if (!e.target.value) {
      nameOutput.innerText = "JANE APPLESEED";
   } else {  
      const inputToUpper = nameInput.value.toUpperCase();
      nameOutput.textContent = inputToUpper;
 }});

 numberInput.addEventListener("keyup", (e) => {
   if (!e.target.value) {
      numberOutput.innerText = "0000 0000 0000 0000";
   } else {
   const inputToSpaces = numberInput.value.replace(/(\d{4})/g, '$1 ');
   numberOutput.textContent = inputToSpaces;
 }});

 monthInput.addEventListener("keyup", dateOutputChange);
 yearInput.addEventListener("keyup", dateOutputChange);

 function dateOutputChange (e) {

   let monthValue = monthInput.value;
   let yearValue = yearInput.value;

   monthValue = monthValue.padStart(2, "0");
   yearValue = yearValue.padStart(2, "0");
   dateOutput.textContent = monthValue + "/" + yearValue;
 };

 cvcInput.addEventListener("keyup", (e) => {
   if (!e.target.value) {
      cvcOutput.innerText = "000";
   } else {
   cvcOutput.textContent = cvcInput.value;
 }});

 function showError (input, error, message) {
   input.classList.add('error-border');
   error.classList.remove('hidden')
   error.textContent = message;
}

function removeError (input, error) {
   input.classList.remove('error-border');
   error.classList.add('hidden')
}

 const correctName = () => {
   const errorNameMessage = document.querySelector('.name-error-message');
   if (nameInput.value === '') {
      showError(nameInput, errorNameMessage,"Can’t be blank");
      return false;
   }else if (!/^[A-Za-z\s-]+$/.test(nameInput.value)) {
      showError(nameInput, errorNameMessage,"Must be a valid name");
      return false;
   } else {
      removeError(nameInput, errorNameMessage);
      return true;
   }
}

 const correctNumber = () => {
   const inputNumberValue = numberInput.value;
   const errorNumberMessage = document.querySelector('.number-error-message');
   if (inputNumberValue === '') {
      showError(numberInput, errorNumberMessage,"Can’t be blank");
      return false;
   }else if (/[^0-9]/.test(numberInput.value)) {
      showError(numberInput, errorNumberMessage,"Wrong format, numbers only");
      return false;
   }else if (inputNumberValue.length < 16) {
      showError(numberInput, errorNumberMessage,"It must be 16 numbers");
      return false;
   } else {
      removeError(numberInput, errorNumberMessage);
      return true;
   }
}

const correctDate = () => {
   const date = new Date();
   const currentMonth = date.getMonth() + 1;
   const currentYear = date.getFullYear() % 100; // Extract the last two digits of the current year
   const errorDateMessage = document.querySelector('.date-error-message');
   if (monthInput.value === '' || yearInput.value === '') {
      showError(monthInput, errorDateMessage,"Can’t be blank");
      showError(yearInput, errorDateMessage,"Can’t be blank");
      return false;
   }else if (monthInput.value > 12 || yearInput.value < currentYear || (parseInt(yearInput.value) === currentYear && monthInput.value < currentMonth)) {
      showError(monthInput, errorDateMessage,"Must be a valid date");
      showError(yearInput, errorDateMessage,"Must be a valid date");
      return false;
   } else {
      removeError(monthInput, errorDateMessage);
      removeError(yearInput, errorDateMessage);
      return true;
   }
}

const correctCvc = () => {
   const errorCvcMessage = document.querySelector('.cvc-error-message');
   if (cvcInput.value === '') {
      showError(cvcInput, errorCvcMessage,"Can’t be blank");
      return false;
   } else {
      removeError(cvcInput, errorCvcMessage);
      return true;
   }
}

const switchPages = () => {
   form.classList.toggle("hidden");
   accessPage.classList.toggle("hidden");
}

form.addEventListener('submit', (e)  => { 
   e.preventDefault();
   if(correctName() && correctNumber() && correctDate() && correctCvc()) {
      switchPages();
   }
});

secondaryButton.addEventListener('click', ()  => {
   form.reset();
   switchPages();
   nameOutput.innerText = "JANE APPLESEED";
   numberOutput.innerText = "0000 0000 0000 0000";
   dateOutput.innerText = "00/00";
   cvcOutput.innerText = "000";
});

 


 

