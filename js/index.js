import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {initialCards} from './initial-cards.js';

import {
  closePopup,
  openPopup,
  popupEscCloseHandler
} from './utils.js'

import {
  settings,
  cards,
  profileEditPopupForm,
  cardAddPopupForm,
  profileEditBtn,
  profilePopupCloseBtn,
  cardAddBtn,
  cardPopupCloseBtn,
  imgPreviewPopupCloseBtn,
  cardAddPopup,
  profileEditPopup,
  cardAddInputCardName,
  cardAddInputCardLink,
  profilePopupInputDesc,
  profilePopupInputName,
  profileName,
  profileDescription
} from './utils/constants.js'

// Функции работы с профилем

function showEditProfilePopup() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDesc.value = profileDescription.textContent;
  editProfileFormValidator.cleanFormValidation();
  openPopup(profileEditPopup);
};

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = profilePopupInputName.value; 
  profileDescription.textContent = profilePopupInputDesc.value;
  closePopup(profileEditPopup);
};

function closeProfilePopup() {
  closePopup(profileEditPopup);
};

// // Функции работы с карточками

const showAddCardPopup = () => {
  cardAddInputCardName.value = '';
  cardAddInputCardLink.value = '';
  addCardFormValidator.cleanFormValidation();
  openPopup(cardAddPopup);
};

const createCard = (card, cardTemplate) => {
  const newCard = new Card(card, cardTemplate)
  return newCard;
}

const addCard = (evt) => {
  evt.preventDefault();
  const card = {};
  card.name = cardAddInputCardName.value;
  card.link = cardAddInputCardLink.value;
  const newCard = createCard(card, settings.cardTemplate);
  cards.prepend(newCard.render())
  closePopup(cardAddPopup);
};

const closeAddCardPopup = (evt) => {
  closePopup(cardAddPopup);
  cardAddInputCardLink.value = '';
  cardAddInputCardLink.value = '';
};

const popupClickCloseHandler = (evt) => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container_img')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}
 
const closeImgPreviewPopup = () => { 
  closePopup(imgPreviewPopup); 
}; 

// // Блок слушателей открытия попапов

profileEditBtn.addEventListener('click', showEditProfilePopup);
cardAddBtn.addEventListener('click', showAddCardPopup);

// // Блок слушателей отправки форм

profileEditPopupForm.addEventListener('submit', updateProfileInfo);
cardAddPopupForm.addEventListener('submit', addCard);

// // Блок слушателей закрытия попапов

profilePopupCloseBtn.addEventListener('click', closeProfilePopup);
cardPopupCloseBtn.addEventListener('click', closeAddCardPopup);
imgPreviewPopupCloseBtn.addEventListener('click', closeImgPreviewPopup);

// // Блок слушателей закрытия попапов через клик

imgPreviewPopup.addEventListener('click', popupClickCloseHandler);
cardAddPopup.addEventListener('click', popupClickCloseHandler);
profileEditPopup.addEventListener('click', popupClickCloseHandler);


initialCards.forEach( card => {
  const newCard = createCard(card, settings.cardTemplate)
  cards.append(newCard.render());
})

const addCardFormValidator = new FormValidator(settings, cardAddPopupForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditPopupForm);
editProfileFormValidator.enableValidation();