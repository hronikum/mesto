// Блок profile

const profileName = document.querySelector('.profile__author-name');
const profileDescription = document.querySelector('.profile__author-description');
const profileEditBtn = document.querySelector('.profile__edit-btn');

// Блок cards

const cards = document.querySelector('.cards');

//Блок card

const cardTemplate = document.querySelector('#cardTemplate').content;
const newCard = cardTemplate.querySelector('.card');
const cardAddBtn = document.querySelector('.profile__add-btn');

// Блок editProfilePopup

const profileEditPopup = document.querySelector('#editProfilePopup');
const profileEditPopupForm = profileEditPopup.querySelector('#profileForm');
const profilePopupCloseBtn = profileEditPopup.querySelector('.popup__close-btn');
const profilePopupInputName = profileEditPopup.querySelector('#inputName');
const profilePopupInputDesc = profileEditPopup.querySelector('#inputDescription');
  

// Блок addCardPopup

const cardAddPopup = document.querySelector('#addCardPopup');
const cardAddPopupForm = cardAddPopup.querySelector('#addCardPopupForm');
const cardAddInputCardName = cardAddPopup.querySelector('#inputCardName');
const cardAddInputCardLink = cardAddPopup.querySelector('#inputCardLink');
const cardPopupCloseBtn = cardAddPopup.querySelector('.popup__close-btn');

// Блок popupImg

const imgPreviewPopup = document.querySelector('#imgPreviewPopup');
const imgPreviewTargetImg = imgPreviewPopup.querySelector('.popup__img');
const imgPreviewTargetCaption = imgPreviewPopup.querySelector('.popup__img-caption');
const imgPreviewPopupCloseBtn = imgPreviewPopup.querySelector('.popup__close-btn');

// Базовые функции открытия и закрытия popup

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscCloseHandler);
};

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscCloseHandler);
};

const cleanFormValidation = (targetPopup) => {
  const formElement = targetPopup.querySelector(settings.formSelector)
  const buttonElement = targetPopup.querySelector(settings.submitButtonSelector);
  const inputList = Array.from(targetPopup.querySelectorAll(settings.inputSelector));

  toggleButton(buttonElement, inputList);
  
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, settings);
  })
}

const popupEscCloseHandler = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
    }
}

const popupClickCloseHandler = (evt) => {
  if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__container_img')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функции работы с профилем

function showEditProfilePopup() {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputDesc.value = profileDescription.textContent;
  openPopup(profileEditPopup);
  cleanFormValidation(profileEditPopup);
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

// Функции работы с карточками

function showAddCardPopup() {
  cardAddInputCardName.value = '';
  cardAddInputCardLink.value = '';
  openPopup(cardAddPopup);
  cleanFormValidation(cardAddPopup);
};

function addCard(evt) {
  evt.preventDefault();
  const cardName = cardAddInputCardName.value;
  const cardLink = cardAddInputCardLink.value;
  const newCard = createCardNode({name: cardName, link: cardLink});
  cards.prepend(newCard);
  closePopup(cardAddPopup);
};

function closeAddCardPopup(evt) {
  closePopup(cardAddPopup);
  cardAddInputCardLink.value = '';
  cardAddInputCardLink.value = '';
};

function handleLikeIcon(card) {
  card.classList.toggle('card__like-btn_active');
};

function handleDeleteCard(card) {
  card.closest('.card').remove();
};

function createCardNode(card) {
  const newCardNode = newCard.cloneNode(true);
  const newCardNodeImg = newCardNode.querySelector('.card__image');
  const newCardNodeTitle = newCardNode.querySelector('.card__title');
  const newCardNodeLikeBtn = newCardNode.querySelector('.card__like-btn');
  const newCardNodeDeleteBtn = newCardNode.querySelector('.card__delete-btn');
  
  newCardNodeImg.src = card.link;
  newCardNodeImg.alt = card.name;
  newCardNodeTitle.textContent = card.name;

  newCardNodeImg.addEventListener('click', evt => {
    handlePreviewPicture(card.name, card.link);
  });

  newCardNodeLikeBtn.addEventListener('click', evt => {
    handleLikeIcon(evt.target);
  });
  
  newCardNodeDeleteBtn.addEventListener('click', evt => {
    handleDeleteCard(evt.target);
  });

  return newCardNode;
};

// Функции работы с превью изображений 

function handlePreviewPicture(name, link) {
  imgPreviewTargetImg.src = link;
  imgPreviewTargetImg.alt = name;
  imgPreviewTargetCaption.textContent = name;
  openPopup(imgPreviewPopup);
};

function closeImgPreviewPopup() {
  closePopup(imgPreviewPopup);
};

// Функции рендеринга по умолчанию

function initialRender() {
  const cardsToRender = initialCards.map(createCardNode);
  cards.append(...cardsToRender);
};

// Блок слушателей открытия попапов

profileEditBtn.addEventListener('click', showEditProfilePopup);
cardAddBtn.addEventListener('click', showAddCardPopup);

// Блок слушателей отправки форм

profileEditPopupForm.addEventListener('submit', updateProfileInfo);
cardAddPopupForm.addEventListener('submit', addCard);

// Блок слушателей закрытия попапов

profilePopupCloseBtn.addEventListener('click', closeProfilePopup);
cardPopupCloseBtn.addEventListener('click', closeAddCardPopup);
imgPreviewPopupCloseBtn.addEventListener('click', closeImgPreviewPopup);

// Блок слушателей закрытия попапов через клик

imgPreviewPopup.addEventListener('click', popupClickCloseHandler);
cardAddPopup.addEventListener('click', popupClickCloseHandler);
profileEditPopup.addEventListener('click', popupClickCloseHandler);


// Блок начального рендеренга
initialRender();