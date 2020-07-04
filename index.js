const editProfileButton = document.querySelector('.profile__edit-btn');
const closeModalButton = document.querySelector('.popup__close-btn');
const modal = document.querySelector('.popup');
const form = modal.querySelector('.popup__form');

const inputName = form.querySelector('.popup__field_type_name'); 
const inputOccupation = form.querySelector('.popup__field_type_occupation'); 

let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');

function toggleModal() {
  modal.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', toggleModal);

closeModalButton.addEventListener('click', toggleModal);

inputName.value = profileName.textContent;
inputOccupation.value = profileOccupation.textContent;

form.addEventListener('submit', (event) => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;

  event.preventDefault();

  toggleModal();
});
