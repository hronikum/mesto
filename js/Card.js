import {handlePreviewPicture} from './utils.js'

export class Card {

  constructor(card, cardTemplateSelector) {
    this._name = card.name;
    this._link = card.link;
    this._cardTemplate = document
    .querySelector(cardTemplateSelector)
    .content
    .cloneNode(true);
  }

  _createView() {
    this._cardView = this._cardTemplate.querySelector('.card');
    this._cardImg = this._cardView.querySelector('.card__image');
    this._cardTitle = this._cardView.querySelector('.card__title');
    this._cardLikeBtn = this._cardView.querySelector('.card__like-btn');
    this._cardDeleteBtn = this._cardView.querySelector('.card__delete-btn');

    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._cardView;
  }

  _handleDeleteCard() {
    this._newCard.remove()
  }

  _handleLikeIcon() {
    this._cardLikeBtn.classList.toggle('card__like-btn_active');
  }

  _setEventListeners() {
    this._cardImg.addEventListener('click', () => {
      handlePreviewPicture(this._name, this._link);
    });
  
    this._cardLikeBtn.addEventListener('click', evt => {
      this._handleLikeIcon();
    });
    
    this._cardDeleteBtn.addEventListener('click', evt => {
      this._handleDeleteCard();
    });
  }

  render() {
    this._newCard = this._createView();
    this._setEventListeners();
    
    return this._newCard;
  }
}