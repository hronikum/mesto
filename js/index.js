import Card from './Card.js'
import FormValidator from './FormValidator.js'
import {initialCards} from './initial-cards.js';
import {cleanFormValidation} from './validate.js'

import {
  closePopup,
  openPopup,
  popupEscCloseHandler
} from './utils.js'


export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// ________

// Блок profile

const profileName = document.querySelector('.profile__author-name');
const profileDescription = document.querySelector('.profile__author-description');
const profileEditBtn = document.querySelector('.profile__edit-btn');

// // Блок cards

const cards = document.querySelector('.cards');
const newCard = cardTemplate.querySelector('.card');
const cardAddBtn = document.querySelector('.profile__add-btn');

// // Блок editProfilePopup

const profileEditPopup = document.querySelector('#editProfilePopup');
export const profileEditPopupForm = profileEditPopup.querySelector('#profileForm');
const profilePopupCloseBtn = profileEditPopup.querySelector('.popup__close-btn');
const profilePopupInputName = profileEditPopup.querySelector('#inputName');
const profilePopupInputDesc = profileEditPopup.querySelector('#inputDescription');

// // Блок addCardPopup

const cardAddPopup = document.querySelector('#addCardPopup');
export const cardAddPopupForm = cardAddPopup.querySelector('#addCardPopupForm');
const cardAddInputCardName = cardAddPopup.querySelector('#inputCardName');
const cardAddInputCardLink = cardAddPopup.querySelector('#inputCardLink');
const cardPopupCloseBtn = cardAddPopup.querySelector('.popup__close-btn');

// // Блок popupImg

const imgPreviewPopup = document.querySelector('#imgPreviewPopup');
const imgPreviewPopupCloseBtn = imgPreviewPopup.querySelector('.popup__close-btn');
const imgPreviewTargetImg = imgPreviewPopup.querySelector('.popup__img');
const imgPreviewTargetCaption = imgPreviewPopup.querySelector('.popup__img-caption');

// // Функции работы с профилем

function showEditProfilePopup() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDesc.value = profileDescription.textContent;
  cleanFormValidation(profileEditPopup);
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

export const showAddCardPopup = () => {
  cardAddInputCardName.value = '';
  cardAddInputCardLink.value = '';
  cleanFormValidation(cardAddPopup);
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
  const newCard = createCard(card, '#cardTemplate');
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

export const handlePreviewPicture = (name, link) => { 
  imgPreviewTargetImg.src = link; 
  imgPreviewTargetImg.alt = name; 
  imgPreviewTargetCaption.textContent = name; 
  openPopup(imgPreviewPopup); 
}; 
 
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
  const newCard = createCard(card, '#cardTemplate')
  cards.append(newCard.render());
})

const addCardFormValidator = new FormValidator(settings, cardAddPopupForm);
addCardFormValidator.enableValidation();

const editProfileFormValidator = new FormValidator(settings, profileEditPopupForm);
editProfileFormValidator.enableValidation();