import {Card} from './Card.js'
import {cleanFormValidation} from './validate.js'

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Твой коммент: В данном файле следует оставить только те функции и переменные, 
// которые экспортируются. Остальной функционал следует поместить в index.js

// Мой ответ:
// Если сделать так, как ты говоришь, то придется из index.js все импортировать сюда обратно.
// Это сделает код запутанным и состоящим из взаимных импортов.
// Этот вопрос обсуждался с Наставником курса, и такое решение было одним из вариантов
// На следующем спринте мы как раз займемся структурой проекта и там все сделаем красиво,
// но сейчас такое решение не противоречит условиям задачи. Либо мне надо применить знания
//  из следующего спринта. Но тогда все окончательно запутаются :-)

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

// // Базовые функции открытия и закрытия popup

export const  closePopup = (targetPopup) => {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscCloseHandler);
};

export const openPopup = (targetPopup) => {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscCloseHandler);
};

// // Функции работы с превью изображений 

export const handlePreviewPicture = (name, link) => {
  imgPreviewTargetImg.src = link;
  imgPreviewTargetImg.alt = name;
  imgPreviewTargetCaption.textContent = name;
  openPopup(imgPreviewPopup);
};

export const closeImgPreviewPopup = () => {
  closePopup(imgPreviewPopup);
};

export const popupEscCloseHandler = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
    }
}

export const popupClickCloseHandler = (evt) => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container_img')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

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

export const addCard = (evt) => {
  evt.preventDefault();
  const card = {};
  card.name = cardAddInputCardName.value;
  card.link = cardAddInputCardLink.value;
  const newCard = new Card(card, '#cardTemplate')
  cards.prepend(newCard.render());
  closePopup(cardAddPopup);
};

export const closeAddCardPopup = (evt) => {
  closePopup(cardAddPopup);
  cardAddInputCardLink.value = '';
  cardAddInputCardLink.value = '';
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

