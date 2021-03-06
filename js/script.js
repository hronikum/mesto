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

// Блок элементов страницы
const cards = document.querySelector('.cards');
const profileName = document.querySelector('.profile__author-name');
const profileJob = document.querySelector('.profile__author-description');
const editProfileBtn = document.querySelector('.profile__edit-btn');
editProfileBtn.addEventListener('click', showPopup); 
const addBtn = document.querySelector('.profile__add-btn');
addBtn.addEventListener('click', showPopupNewPlace); 

// Блок с popup формы редактирования пользователя
const popupBlock = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
formElement.addEventListener('submit', formSubmitHandler); 
const nameInput = formElement.querySelector('#nameInput');
const jobInput = formElement.querySelector('#jobInput');
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
const closePopupBtn = document.querySelector('.popup__close-btn');
closePopupBtn.addEventListener('click', closePopup);

// Блок с popup формы добавленяия нового места
const popupNewPlace = document.querySelector('.popupAddNewPlace');


function showPopup() {
  popupBlock.classList.add('popup_opened');
}

function showPopupNewPlace() {
  popupNewPlace.classList.add('popup_opended')
}


function closePopup() {
    popupBlock.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}

//  Создаем место
function createCard(place) {
  const cardExample = document.querySelector('#cardTemplate').content.cloneNode(true);
  const cardImage = cardExample.querySelector('.card__image');
  const cardTitle = cardExample.querySelector('.card__title');
  const cardLikeBtn = cardExample.querySelector('.card__like-btn');
  
  cardImage.src = place.link
  cardImage.alt = place.name
  cardTitle.textContent = place.name

  cardImage.addEventListener('click', evt => {
    const eventTarget = evt.target;
    showPopupImg(place.name, place.link);
  });
  
  cardLikeBtn.addEventListener('click', evt => {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-btn_active');
  }); 
  
  return cardExample;
  
};

function showPopupImg(title, imgLink) {
  console.log(title, imgLink)
};

function initialRender() {
  const result = initialCards.map(createCard);
  cards.append(...result);
};

initialRender();
