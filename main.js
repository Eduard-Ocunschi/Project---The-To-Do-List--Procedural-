"use strict";

//Buttons
const openModalBtn = document.querySelector(".add-btn");
const cancelModal = document.querySelector(".modal-btn-cancel");
const saveBtnModal = document.querySelector(".modal-btn-save");
//Modal
const modalContainer = document.querySelector(".modal-container");
const modalOverlay = document.querySelector(".modal-overlay");
//Dinamic Card Modal
const dinCardModal = document.querySelector(".dinamic-card-modal");
const cardModalOverlay = document.querySelector(".card-modal-overlay");
// Form Inputs
const formTitle = document.querySelector(".inp-title");
const formTextarea = document.querySelector(".inp-textarea");
// Status Column
const todoColumn = document.querySelector(".state-content-todo");
const inProgressColumn = document.querySelector(".state-content-inprogress");
const doneColumn = document.querySelector(".state-content-done");

// TASK LISTS
let tasksList = [];
// TASK STATES
const taskStates = ["To Do", "In Progress", "Done"];

window.onload = () => {
  // ----->   FUNCTIONALITY OPEN/CLOSE MODAL <-----
  const openModalFunction = function () {
    setTimeout(() => {
      modalContainer.classList.remove("hidden");
      modalContainer.classList.add("animationModal-moveIn");
      modalOverlay.classList.remove("hidden");
      modalOverlay.classList.add("animation-bgIn");
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

      setTimeout(() => {
        modalContainer.classList.remove("animation-moveOut");
        modalOverlay.classList.remove("animation-bgOut");
      }, 601);
    }, 180);
  };
  // Open Modal
  openModalBtn.addEventListener("click", openModalFunction);

  // Close Modal
  cancelModal.addEventListener("click", closeModalFunction);
  modalOverlay.addEventListener("click", closeModalFunction);
  document.addEventListener("keydown", function (btn) {
    if (btn.key === "Escape" && !modalContainer.classList.contains("hidden")) {
      closeModalFunction();
    }
  });

  // ----->   CREATING THE TASK <-----

  // Date Generating Function
  const formatNewDate = () => {
    const now = new Date();
    const monthDay = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return `${monthDay < 10 ? "0" + monthDay : monthDay}-${
      month < 10 ? "0" + month : month
    }-${year} ${hour < 10 ? "0" + hour : hour}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // Redefining the Task List Based On New Imput
  const setTasksList = (list) => {
    tasksList = list;
    renderTasks();
  };

  // Form Data Colecting Function
  const getTaskDataFromForm = () => {
    const taskObj = {
      id: Date.now(),
      title: formTitle.value,
      description: formTextarea.value,
      timestamp: formatNewDate(),
      status: taskStates[0],
    };
    return taskObj;
  };

  // MODAL SAVE BUTTON
  saveBtnModal.addEventListener("click", closeModalFunction);
  saveBtnModal.addEventListener("click", () => {
    const task = getTaskDataFromForm();
    const newList = [...tasksList, task];
    setTasksList(newList);
  });

  // BUILDING THE TASK CARD
  const buildCard = (taskObj) => {
    const container = document.createElement("div");
    container.className = "card-container";
    const title = document.createElement("h3");
    title.className = "card-title";
    title.innerText = taskObj.title;
    const description = document.createElement("span");
    description.className = "card-description";
    description.innerText = taskObj.description;
    const timeStamp = document.createElement("span");
    timeStamp.className = "card-timestamp";
    timeStamp.innerText = taskObj.timestamp;

    const cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    const statusDropDown = document.createElement("select");
    statusDropDown.addEventListener("change", (e) => {
      taskObj.status = e.target.value;
      setTasksList(tasksList);
    });
    const defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.innerText = "Select Status";
    statusDropDown.append(defaultOption);
    taskStates.forEach((status) => {
      const option = document.createElement("option");
      option.value = status;
      option.innerText = status;
      statusDropDown.append(option);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      const newList = tasksList.filter((task) => {
        return taskObj.id !== task.id;
      });
      setTasksList(newList);
    });

    cardFooter.append(statusDropDown, deleteBtn);
    container.append(title, description, timeStamp, cardFooter);

    container.addEventListener("click", (ev) => {
      switch (ev.target.className) {
        case "card-title":
        case "card-description":
        case "card-timestamp":
        case "card-container":
        case "card-footer":
          const cardModalTitle = document.createElement("div");
          cardModalTitle.className = "card-modal-title";
          cardModalTitle.innerText = taskObj.title;
          const cardModalDescription = document.createElement("div");
          cardModalDescription.className = "card-modal-description";
          cardModalDescription.innerText = taskObj.description;

          const cardModalTimeStamp = document.createElement("div");
          cardModalTimeStamp.className = "card-modal-timestamp";
          cardModalTimeStamp.innerText = taskObj.timestamp;

          const cardModalBtn = document.createElement("button");
          cardModalBtn.classList = "btn card-modal-btn";
          cardModalBtn.innerText = "Cancel";
          const cardModal = document.createElement("div");
          cardModal.className = "card-modal-container";
          cardModal.classList.add("animationModal-moveIn");
          cardModal.append(
            cardModalTitle,
            cardModalDescription,
            cardModalTimeStamp,
            cardModalBtn
          );
          dinCardModal.append(cardModal);
          cardModalOverlay.classList.remove("hidden");
          cardModalOverlay.classList.add("animation-bgIn");

          setTimeout(() => {
            modalOverlay.classList.remove("animation-bgIn");
            cardModal.classList.remove("animationModal-moveIn");
          }, 601);

          cardModalBtn.addEventListener("click", () => {
            setTimeout(() => {
              cardModal.classList.add("animation-moveOut");
              cardModalOverlay.classList.add("animation-bgOut");
            }, 180);
            setTimeout(() => {
              dinCardModal.innerHTML = "";
              cardModal.classList.remove("animation-moveOut");
              cardModalOverlay.classList.remove("animation-bgOut");
              cardModalOverlay.classList.add("hidden");
            }, 601);
          });

          cardModalOverlay.addEventListener("click", () => {
            cardModal.classList.add("animation-moveOut");
            cardModalOverlay.classList.add("animation-bgOut");

            setTimeout(() => {
              dinCardModal.innerHTML = "";
              cardModalOverlay.classList.remove("animation-bgOut");
              cardModal.classList.remove("animation-moveOut");
              cardModalOverlay.classList.add("hidden");
            }, 601);
          });

          document.addEventListener("keydown", function (btn) {
            if (
              btn.key === "Escape" &&
              !cardModalOverlay.classList.contains("hidden")
            ) {
              cardModal.classList.add("animation-moveOut");
              cardModalOverlay.classList.add("animation-bgOut");

              setTimeout(() => {
                dinCardModal.innerHTML = "";
                cardModalOverlay.classList.remove("animation-bgOut");
                cardModal.classList.remove("animation-moveOut");
                cardModalOverlay.classList.add("hidden");
              }, 601);
            }
          });

          console.log(cardModalTitle);
          console.log(container);
          break;
      }
    });
    return container;
  };

  //RENDER TASKS
  const renderTasks = () => {
    todoColumn.innerHTML = "";
    inProgressColumn.innerHTML = "";
    doneColumn.innerHTML = "";

    tasksList.forEach((task) => {
      const card = buildCard(task);

      switch (task.status) {
        case taskStates[0]:
          todoColumn.append(card);
          break;
        case taskStates[1]:
          inProgressColumn.append(card);
          break;
        case taskStates[2]:
          doneColumn.append(card);
          break;
      }
    });
  };

  // ---------- Card Description Modal ---------
};
