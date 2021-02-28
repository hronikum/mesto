//
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__author-name');
let profileJob = document.querySelector('.profile__author-description');

let editProfileBtn = document.querySelector('.profile__edit-btn');
let popupBlock = document.querySelector('.popup');
let closePopupBtn = document.querySelector('.popup__close-btn');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('#nameInput');
let jobInput = formElement.querySelector('#jobInput');


function showPopup() {  
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    popupBlock.classList.add('popup_opened');
}
editProfileBtn.addEventListener('click', showPopup); 

function closePopup() {
    popupBlock.classList.remove('popup_opened');
}

closePopupBtn.addEventListener('click', closePopup);




// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 