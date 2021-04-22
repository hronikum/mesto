import {Card} from './Card.js'
import {initialCards} from './initial-cards.js';
import {settings,
  profileEditPopupForm,
  cardAddPopupForm
} from './utils.js'
import {FormValidator} from './FormValidator.js'

const cards = document.querySelector('.cards');

// И тут мои комменты
// Твой комментарий: 
// Функционал создания карточки следует вынести в функцию createCard, 
// которая просто должна возвращать новую карточку.

// Мой вопрос:
// Зачем тут нужна функция, если вся суть этого спринта была в том, чтобы функционал
// перенести в классы и избавиться от функций? Здесь же нет повторяемого кода, мы 
// бежим по массиву, и создаем экземпляры класса, которые затем добавляем в разметку.
// Функция только усложнит этот код и никак не поможет.

initialCards.forEach( card => {
  const newCard = new Card(card, '#cardTemplate')
  cards.append(newCard.render());
})

const addCardFormValidator = new FormValidator(settings, cardAddPopupForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditPopupForm);
editProfileFormValidator.enableValidation();