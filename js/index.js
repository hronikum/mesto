import {Card} from './Card.js'
import {initialCards} from './initial-cards.js';
import {settings} from './utils.js'
import {FormValidator} from './FormValidator.js'

const cards = document.querySelector('.cards');

initialCards.forEach( card => {
  const newCard = new Card(card, '#cardTemplate')
  cards.append(newCard.render());
})

// создаем список форм
const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
// проходим по списку форм
formList.forEach(formElement => {
  // создаем для каждой формы экземпляр класса FormValidator
  const newFormValidator = new FormValidator(settings, formElement);
  // включаем валидацию
  newFormValidator.enableValidation();
})