//Модалки
const editProfileModal = document.querySelector('.popup_type_edit-profile');
const addCardModal = document.querySelector('.popup_type_add-place');
const openPhotoModal = document.querySelector('.popup_type_photo');

//Формы
const editForm = editProfileModal.querySelector('.popup__form');
const addForm = addCardModal.querySelector('.popup__form');

//Кнопки
const editProfileButton = document.querySelector('.profile__edit-btn');
const addPlaceButton = document.querySelector('.profile__add-btn');

const editProfileModalCloseButton = editProfileModal.querySelector('.popup__close-btn');
const addCardModalCloseButton = addCardModal.querySelector('.popup__close-btn');
const openPhotoModalCloseButton = openPhotoModal.querySelector('.popup__close-btn');

//Инпуты
const inputName = editForm.querySelector('.popup__field_type_name');  
const inputOccupation = editForm.querySelector('.popup__field_type_occupation');  
const inputTitle = addForm.querySelector('.popup__field_type_title');  
const inputImageLink = addForm.querySelector('.popup__field_type_image-link');  

//Инфо из профиля
const profileName = document.querySelector('.profile__name'); 
const profileOccupation = document.querySelector('.profile__occupation'); 

//Данные изображения
let openPhotoModalTitle = openPhotoModal.querySelector('.popup__photo-title'); 
let openPhotoModalImg = openPhotoModal.querySelector('.popup__photo'); 
 
// Переключатели отображения попапа
function toggleModal(modal) { 
  if (!modal.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent; 
    inputOccupation.value = profileOccupation.textContent; 
  }

  modal.classList.toggle('popup_opened'); 
} 

// Сохранение внесенных в профиль изменений
function submitProfileChanges(event) { 
  event.preventDefault(); 

  profileName.textContent = inputName.value; 
  profileOccupation.textContent = inputOccupation.value; 
 
  toggleModal(editProfileModal);
} 

// Открытие модалки добавления места
function addCard() { 
  toggleAddModal();
} 

// Добавление нового места
function addPlace(event) { 
  event.preventDefault(); 

  renderCard({name: inputTitle.value, link: inputImageLink.value})
 
  toggleModal(addCardModal);
} 


//Слушатели
editProfileButton.addEventListener('click', () => {
  toggleModal(editProfileModal)
}); 
addPlaceButton.addEventListener('click', () => {
  toggleModal(addCardModal)
}); 

editProfileModalCloseButton.addEventListener('click', () => {
  toggleModal(editProfileModal)
}); 
addCardModalCloseButton.addEventListener('click', () => {
  toggleModal(addCardModal)
}); 

openPhotoModalCloseButton.addEventListener('click', () => {
  toggleModal(openPhotoModal)
}); 


editForm.addEventListener('submit', submitProfileChanges); 
addForm.addEventListener('submit', addPlace); 


// Список первоначальных карточек
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



function createCard(data) {
  //Находим шаблон в html и клонируем
  const cardTemplate = document.querySelector('.card-template').content.querySelector('.place');
  const cardElement = cardTemplate.cloneNode(true);

  //Выбираем элементы карточки
  const cardImage = cardElement.querySelector('.place__image');
  const cardTitle = cardElement.querySelector('.place__title');
  const cardLikeButton = cardElement.querySelector('.place__like-btn'); 
  const cardDeleteButton = cardElement.querySelector('.place__delete-btn'); 

  //Заполняем значениями из списка
  cardTitle.textContent = data.name;
  cardImage.src = data.link;

  cardImage.addEventListener('click', () => {
    openPhotoModalTitle.textContent = cardTitle.textContent;
    openPhotoModalImg.src = cardImage.src;

    toggleModal(openPhotoModal);
  });

  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('place__like-btn_liked');
  });

  cardDeleteButton.addEventListener('click', () => {
    cardDeleteButton.closest('.place').remove();
  });

  return cardElement;
} 


//Место куда будем вставлять карточки
const cards = document.querySelector('.places');

//Добавляем карточки в нужную секцию
function renderCard(data) {
  cards.prepend(createCard(data));
} 

//Создаем карточки
initialCards.forEach((data) => {
  renderCard(data);
})
