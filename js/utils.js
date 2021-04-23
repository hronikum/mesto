// Базовые функции открытия и закрытия popup

export const  closePopup = (targetPopup) => {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener('keyup', popupEscCloseHandler);
};

export const openPopup = (targetPopup) => {
  targetPopup.classList.add('popup_opened');
  document.addEventListener('keyup', popupEscCloseHandler);
};

export const popupEscCloseHandler = (evt) => {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
    }
}

// // Функции работы с превью изображений  
