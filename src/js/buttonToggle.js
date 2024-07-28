/**
 * Initializes the button toggle functionality. Adds a click event listener to the fixed button
 * that toggles the visibility of menu and close icons, as well as additional buttons.
 */
export const initializeButtonToggle = () => {
  const btnFixed = document.getElementById("btnFixed");
  const iconMenu = document.getElementById("iconMenu");
  const iconClose = document.getElementById("iconClose");
  const extraButtons = document.querySelectorAll(".button--extra");
  let isClicked = false;

  btnFixed.addEventListener("click", () => {
    if (!isClicked) {
      iconMenu.style.opacity = 0;
      setTimeout(() => {
        iconClose.style.opacity = 1;
      }, 500);
      extraButtons.forEach((button) => {
        button.style.opacity = 1;
      });
    } else {
      iconClose.style.opacity = 0;
      setTimeout(() => {
        iconMenu.style.opacity = 1;
      }, 500);
      extraButtons.forEach((button) => {
        button.style.opacity = 0;
      });
    }
    isClicked = !isClicked;
  });
};
