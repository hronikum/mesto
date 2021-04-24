export const settings = {
  cardTemplate: '#cardTemplate',  
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Блок profile

export const profileName = document.querySelector('.profile__author-name');
export const profileDescription = document.querySelector('.profile__author-description');
export const profileEditBtn = document.querySelector('.profile__edit-btn');

// // Блок cards

export const cards = document.querySelector('.cards');
const newCard = cardTemplate.querySelector('.card');
export const cardAddBtn = document.querySelector('.profile__add-btn');

// // Блок editProfilePopup

export const profileEditPopup = document.querySelector('#editProfilePopup');
export const profileEditPopupForm = profileEditPopup.querySelector('#profileForm');
export const profilePopupCloseBtn = profileEditPopup.querySelector('.popup__close-btn');
export const profilePopupInputName = profileEditPopup.querySelector('#inputName');
export const profilePopupInputDesc = profileEditPopup.querySelector('#inputDescription');

// // Блок addCardPopup

export const cardAddPopup = document.querySelector('#addCardPopup');
export const cardAddPopupForm = cardAddPopup.querySelector('#addCardPopupForm');
export const cardAddInputCardName = cardAddPopup.querySelector('#inputCardName');
export const cardAddInputCardLink = cardAddPopup.querySelector('#inputCardLink');
export const cardPopupCloseBtn = cardAddPopup.querySelector('.popup__close-btn');

// // Блок popupImg

export const imgPreviewPopup = document.querySelector('#imgPreviewPopup');
export const imgPreviewPopupCloseBtn = imgPreviewPopup.querySelector('.popup__close-btn');
export const imgPreviewTargetImg = imgPreviewPopup.querySelector('.popup__img');
export const imgPreviewTargetCaption = imgPreviewPopup.querySelector('.popup__img-caption');
