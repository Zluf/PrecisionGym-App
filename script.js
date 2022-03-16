"use strict";

const buttonsContainer = document.querySelector(".buttons");
const oneDay = document.querySelector(".day");
const btnAddExercise = document.querySelector(".add-exercise");
const exerciseForm = document.querySelector(".exercise-form");
const overlay = document.querySelector(".overlay");
const addDay = document.querySelector(".add-day");
const mainSection = document.querySelector("main");
const checkBox = document.querySelectorAll(".checkbox input");
const dayExercises = document.querySelector(".day__exercises");

let currentDay = 1;

let day1Exercises = [];
let curButNo = 0;

//
// 🔘 "REST DAY BUTTON"
//

checkBox.forEach((box) => {
  box.addEventListener("click", function () {
    const curDay = document.querySelector(`.day--${currentDay} .day-exercises`);
    if (box.checked) {
      curDay.style.opacity = 0.5;
      curDay.style.pointerEvents = "none";
    } else if (!box.checked) {
      curDay.style.opacity = 1;
      curDay.style.pointerEvents = "";
    }
  });
});

//
// 🔘 "ADD EXERCISE" button - Opening and closing modal window
//

// ❌
const closeExerciseForm = function () {
  exerciseForm.classList.add("hidden");
  overlay.classList.add("hidden");
};

// 📂
document.addEventListener("click", function (e) {
  const target = e.target.closest(".add-exercise");

  if (target) {
    const arr = e.target.classList[1].split("");
    curButNo = arr[arr.length - 1];
    console.log(curButNo);

    exerciseForm.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelectorAll("input").forEach((i) => i.blur());

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeExerciseForm();
    });

    document.addEventListener("click", function (e) {
      if (
        (!overlay.classList.contains("hidden") &&
          e.target.closest(".close-ex-form")) ||
        e.target.closest(".overlay")
        //   e.target.closest === ".close-ex-form"
      )
        closeExerciseForm();
    });
  }
});

// ・ Adding user data

const addSet = new Promise(function (resolve, reject) {
  if (Boolean(document.querySelector(".add-set"))) {
    resolve("Yay!");
  } else reject("Nay!");
});

const addExercise = function () {
  const exercise = document.querySelector("form #ex-name").value;
  const weight = document.querySelector("form #weight").value;
  const newExHTML = `
    <section class='exercise ex${curButNo}'>
    <div class='ex-name'>Exercise: ${exercise} </div>
    <div class='ex-weight'>Weight: ${weight}kg </div>
    <div>Set 1:</div>
    <button class="add-set">+ Set ${curButNo}</button>
    </section>
    <button class="add-exercise add-exercise--${
      +curButNo + 1
    }">+ Add Exercise</button>
    `;

  document.querySelectorAll("input").forEach((i) => (i.value = ""));

  closeExerciseForm();

  document
    .querySelector(
      `.day--${currentDay} .day-exercises .add-exercise--${curButNo}`
    )
    .insertAdjacentHTML("afterend", newExHTML);

  day1Exercises.push({ name: `${exercise}`, weight: `${weight}`, sets: 0 });

  console.log(day1Exercises);
};

// addSet.then((resp) => console.log(resp));

document.addEventListener("keydown", function (e) {
  if (!exerciseForm.classList.contains("hidden") && e.key === "Enter")
    addExercise();
});

document.querySelector(".add").addEventListener("click", addExercise);

// ▶️ ADDING NEW SECTION (+ Day) - 🚩 to implements later

// buttonsContainer.addEventListener("click", function (e) {
//   // finds the wanted elemend
//   const clicked = e.target.closest(".add-day");
//   // Guard Clause
//   if (!clicked) return;
//   if (clicked) {
//     daysTotal.push(daysTotal.length + 1);
//     console.log(daysTotal);
//     const newDayButtonHTML = `<button class="choose-day button--${daysTotal.length}" data-tab="${daysTotal.length}">Day
//     </button>`;
//     const newDaySectonHTML = `<div class="day day--${daysTotal.length}">
//     <button class="add-exercise">+ Add Exercise ${daysTotal.length}</button>
//     </div>`;
//     addDay.insertAdjacentHTML("beforebegin", newDayButtonHTML);
//     mainSection.insertAdjacentHTML("beforeend", newDaySectonHTML);

//   }
// });

//
// 🔘 "WEEKDAY" button (switching between W/O days)
//

buttonsContainer.addEventListener("click", function (e) {
  // finds the wanted elemend
  const clicked = e.target.closest(".choose-day");

  if (clicked) {
    // Hide inactive day windows
    const days = document.querySelectorAll(".day");
    const tabs = document.querySelectorAll(".choose-day");
    days.forEach((day) => {
      day.classList.remove("tab--active");
    });
    tabs.forEach((tab) => {
      tab.style.fontWeight = "lighter";
      tab.style.fontSize = "12px";
      tab.style.height = "50px";
    });
    // Bring up the active day window
    document
      .querySelector(`.day--${clicked.dataset.tab}`)
      .classList.add("tab--active");
    currentDay = clicked.dataset.tab;
    clicked.style.fontWeight = "bolder";
    clicked.style.fontSize = "1.5rem";
    clicked.style.height = "70px";
    console.log(`You're on day ${currentDay}`);
  }
});

// console.log(Boolean(document.querySelector("img")));
