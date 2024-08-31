const openModal = document.querySelector(".add-btn");
const modal = document.querySelector(".modal");
const contentContainer = document.querySelector(".content-container");
const modalContainer = document.querySelector(".modal-container");

const cancelModal = document.querySelector(".modal-btn-cancel");

window.onload = () => {
  // Open Modal
  openModal.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("animation-bgIn");
    modalContainer.classList.add("animationModal-moveIn");
    contentContainer.classList.add("opacity");
    contentContainer.classList.remove("animation-moveIn");
  });

  // Close Modal
  cancelModal.addEventListener("click", () => {
    setTimeout(() => {
      modalContainer.classList.remove("animationModal-moveIn");
      modal.classList.add("animation-bgOut");
      modalContainer.classList.add("animation-moveOut");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 801);
      //test
      // addEventListener("animationend", () => {
      //   modal.classList.add("hidden");
      // });

      setTimeout(() => {
        modalContainer.classList.remove("animation-moveOut");
      }, 801);
      setTimeout(() => {
        modal.classList.remove("animation-bgOut");
      }, 801);
    }, 180);
  });
};
