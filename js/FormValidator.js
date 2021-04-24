export default  class FormValidator {
  
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._settings = settings;
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._formElement.addEventListener('', (evt) => {
      evt.preventDefault();
    });
  
    // найти кнопку формы
    this._buttonElement =  this
    ._formElement
    .querySelector(this._settings.submitButtonSelector)
    
    // составить список инпутов
    this._inputList = Array.from(this
      ._formElement
      .querySelectorAll(this._settings.inputSelector))
      
    // повесить обработчики на инпуты
    this._inputList.forEach( inputElement => {    
      inputElement.addEventListener('input', () => {
        // проверить инпут и если надо показать/убрать ошибку
        this._checkInput(inputElement);
        this._toggleButton();
      });
    })
  }

  _showInputError(inputElement) {
    const errorInputElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorInputElement.textContent = inputElement.validationMessage;
    errorInputElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass)
  }

  _hideInputError(inputElement) {
    const errorInputElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorInputElement.textContent = '';
    errorInputElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass)
  }

  _hasInvalidInput (inputList) {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid
    })
  }

  _toggleButton = () => {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true)
    } else {
      this._buttonElement.removeAttribute('disabled')
    }
  }

  _checkInput = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement);
    }
  }

  cleanFormValidation = () => {
    this._toggleButton();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}