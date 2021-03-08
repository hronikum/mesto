const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileName = document.querySelector('.profile__author-name');
const profileDescription = document.querySelector('.profile__author-description');
const profileEditBtn = document.querySelector('.profile__edit-btn');
profileEditBtn.addEventListener('click', showEditProfilePopup);

let cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('#cardTemplate').content;
const addCardBtn = document.querySelector('.profile__add-btn');
addCardBtn.addEventListener('click', showAddCardPopup);


function addCard(evt) {
  evt.preventDefault();
  cardName = inputCardName.value;
  cardLink = inputCardLink.value;
  newCard = createCardNode({'name': cardName, 'link': cardLink});
  cards.prepend(newCard);
  inputCardName.value = '';
  inputCardLink.value = '';
  closePopup(evt);
};

function showAddCardPopup() {
  const addCardPopup = document.querySelector('#addCardPopup');
  const addCardPopupForm = addCardPopup.querySelector('#addCardPopupForm');
  addCardPopupForm.addEventListener('submit', addCard);
  const inputCardName = addCardPopup.querySelector('#inputCardName');
  const inputCardLink = addCardPopup.querySelector('#inputCardLink');
  const closeAddCardPopupBtn = addCardPopup.querySelector('.popup__close-btn');
  closeAddCardPopupBtn.addEventListener('click', closeAddCardPopup);
  addCardPopup.classList.add('popup_opened');
};

function closeAddCardPopup(evt) {
  inputCardName.value = '';
  inputCardLink.value = '';
  closePopup(evt);
};

function updateProfileInfo(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value; 
  profileDescription.textContent = inputDescription.value;
  closePopup(evt);
};

function showEditProfilePopup() {
  const targetPopup = document.querySelector('#editProfilePopup');
  const inputName = targetPopup.querySelector('#inputName');
  const inputDescription = targetPopup.querySelector('#inputDescription');
  const editProfilePopupForm = targetPopup.querySelector('#profileForm');
  const closeProfilePopupBtn = targetPopup.querySelector('.popup__close-btn');
  closeProfilePopupBtn.addEventListener('click', closePopup);

  editProfilePopupForm.addEventListener('submit', updateProfileInfo);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  targetPopup.classList.add('popup_opened');
};

function createCardNode(card) {
  const newCardNode = cardTemplate.querySelector('.card').cloneNode('true');
  const newCardNodeImg = newCardNode.querySelector('.card__image');
  const newCardNodeTitle = newCardNode.querySelector('.card__title');
  const newCardNodeLikeBtn = newCardNode.querySelector('.card__like-btn');
  const newCardNodeDeleteBtn = newCardNode.querySelector('.card__delete-btn');
  
  newCardNodeImg.src = card.link;
  newCardNodeImg.alt = card.name;
  newCardNodeTitle.textContent = card.name;

  newCardNodeImg.addEventListener('click', evt => {
    const targetImg = evt.target;
    showImgPreviewPopup(card.name, card.link);
  });

  newCardNodeLikeBtn.addEventListener('click', evt => {
    const targetLikeBtn = evt.target;
    targetLikeBtn.classList.toggle('card__like-btn_active')
  });
  
  newCardNodeDeleteBtn.addEventListener('click', evt => {
    const targetDeleteBtn = evt.target;
    const cardToDelete = targetDeleteBtn.closest('.card');
    cardToDelete.remove();
  });

  return newCardNode;
};

function showImgPreviewPopup(name, link) {
  const imgPreviewPopup = document.querySelector('#imgPreviewPopup');
  const targetImg = imgPreviewPopup.querySelector('.popup__img');
  const targetCaption = imgPreviewPopup.querySelector('.popup__img-caption');
  const targetCloseBtn = imgPreviewPopup.querySelector('.popup__close-btn');
  
  targetImg.src = link;
  targetImg.alt = name;
  targetCaption.textContent = name;

  targetCloseBtn.addEventListener('click', closeImgPreviewPopup);

  imgPreviewPopup.classList.add('popup_opened');
};

function closeImgPreviewPopup(evt) {
  closePopup(evt);

  const targetImg = imgPreviewPopup.querySelector('.popup__img');
  const targetCaption = imgPreviewPopup.querySelector('.popup__img-caption');

  targetImg.src = '';
  targetImg.alt = '';
  targetCaption.textContent = '';
};

function closePopup(evt) {
  targetPopup = evt.target.closest('.popup');
  targetPopup.classList.remove('popup_opened');
};

function initialRender() {
  const cardsToRender = initialCards.map(createCardNode);
  cards.append(...cardsToRender);
};

initialRender();