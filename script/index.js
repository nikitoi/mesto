const editProfileButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.popup__close-btn');
const modal = document.querySelector('.popup');
const form = modal.querySelector('.popup__form');
 
const inputName = form.querySelector('.popup__field_type_name');  
const inputOccupation = form.querySelector('.popup__field_type_occupation');  
 
let profileName = document.querySelector('.profile__name'); 
let profileOccupation = document.querySelector('.profile__occupation'); 
 
// Переключатель отображения попапа
function toggleModal() { 
  modal.classList.toggle('popup_opened'); 
} 

// При открытии модального окна данные заполнятются в форму
function editInfo() { 
  inputName.value = profileName.textContent; 
  inputOccupation.value = profileOccupation.textContent; 
  toggleModal();
} 

// Сохранение внесенных изменений
function submitChanges(event) { 
  event.preventDefault(); 

  profileName.textContent = inputName.value; 
  profileOccupation.textContent = inputOccupation.value; 
 
  toggleModal();
} 

editProfileButton.addEventListener('click', editInfo); 
closeModalButton.addEventListener('click', toggleModal); 
form.addEventListener('submit', submitChanges); 