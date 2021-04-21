import {settings} from './utils.js'

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

export const cleanFormValidation = (targetPopup) => {
  const formElement = targetPopup.querySelector(settings.formSelector)
  const buttonElement = targetPopup.querySelector(settings.submitButtonSelector);
  const inputList = Array.from(targetPopup.querySelectorAll(settings.inputSelector));

  toggleButton(buttonElement, inputList);
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, settings);
  })
}