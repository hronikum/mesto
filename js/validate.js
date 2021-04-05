const showInputError = (formElement, inputElement, settings) => {
  const errorInputElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorInputElement.textContent = inputElement.validationMessage;
  errorInputElement.classList.add(settings.errorClass);
}
const hideInputError = (formElement, inputElement, settings) => {
  const errorInputElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorInputElement.textContent = '';
  errorInputElement.classList.remove(settings.errorClass);
}

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid
  })
}

const toggleButton = (buttonElement, inputList) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.removeAttribute('disabled')
  }
}

const checkInput = (formElement, inputElement, settings) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, settings)
  } else {
    showInputError(formElement, inputElement, settings);
  }
}

const setEventListeners = (formElement, settings) => {
  // отменить поведение по умолчанию
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // найти кнопку формы
  const buttonElement =  formElement.querySelector(settings.submitButtonSelector)
  
  // составить список инпутов
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector))
    
  // повесить обработчики на инпуты
  inputList.forEach( inputElement => {    
    inputElement.addEventListener('input', () => {
      // проверить инпут и если надо показать/убрать ошибку
      checkInput(formElement, inputElement, settings);
      toggleButton(buttonElement, inputList);
    });
  })
}

const enableValidation = (settings) => {
  // создать список форм
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
  // повесить обработчик
  formList.forEach(formElement => {
    // повесить обработчики
    setEventListeners(formElement, settings)
  })
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(settings); 