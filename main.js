const openModalBtn = document.querySelector(".add-btn");
const contentContainer = document.querySelector(".content-container");
const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".modal-overlay");

const cancelModal = document.querySelector(".modal-btn-cancel");

window.onload = () => {
  // FUNCTIONALITY
  const openModalFunction = function () {
    setTimeout(() => {
      modalContainer.classList.remove("hidden");
      modalContainer.classList.add("animationModal-moveIn");
      modalOverlay.classList.remove("hidden");
      modalOverlay.classList.add("animation-bgIn");
      // contentContainer.classList.add("opacity");
      // contentContainer.classList.remove("animation-moveIn");
    }, 100);
  };

  const closeModalFunction = function () {
    setTimeout(() => {
      modalContainer.classList.remove("animationModal-moveIn");
      modalContainer.classList.add("animation-moveOut");
      modalOverlay.classList.add("animation-bgOut");
      setTimeout(() => {
        modalContainer.classList.add("hidden");
        modalOverlay.classList.add("hidden");
      }, 601);
      //test
      // addEventListener("animationend", () => {
      //   modal.classList.add("hidden");
      // });

      setTimeout(() => {
        modalContainer.classList.remove("animation-moveOut");
        modalOverlay.classList.remove("animation-bgOut");
      }, 601);
    }, 180);
  };
  // Open Modal
  openModalBtn.addEventListener("click", openModalFunction);

  // openModalBtn.addEventListener("click", () => {
  //   setTimeout(() => {
  //     modalContainer.classList.remove("hidden");
  //     modalContainer.classList.add("animationModal-moveIn");
  //     modalOverlay.classList.remove("hidden");
  //     modalOverlay.classList.add("animation-bgIn");
  //     contentContainer.classList.add("opacity");
  //     contentContainer.classList.remove("animation-moveIn");
  //   }, 100);
  // });

  // Close Modal
  cancelModal.addEventListener("click", closeModalFunction);
  modalOverlay.addEventListener("click", closeModalFunction);
  document.addEventListener("keydown", function (btn) {
    if (btn.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      closeModalFunction();
    }
  });
  // cancelModal.addEventListener("click", () => {
  //   setTimeout(() => {
  //     modalContainer.classList.remove("animationModal-moveIn");
  //     modalContainer.classList.add("animation-moveOut");
  //     modalOverlay.classList.add("animation-bgOut");
  //     setTimeout(() => {
  //       modalContainer.classList.add("hidden");
  //       modalOverlay.classList.add("hidden");
  //     }, 601);
  //     //test
  //     // addEventListener("animationend", () => {
  //     //   modal.classList.add("hidden");
  //     // });

  //     setTimeout(() => {
  //       modalContainer.classList.remove("animation-moveOut");
  //       modalOverlay.classList.remove("animation-bgOut");
  //     }, 601);
  //   }, 180);
  // });
};
