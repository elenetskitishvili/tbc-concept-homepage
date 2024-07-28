/**
 * Handles the menu toggle functionality. Adds event listeners to buttons and manages the visibility
 * and transparency of navigation elements based on user interactions.
 */
export const handleMenuToggle = () => {
  const productsBtn = document.getElementById("products");
  const offersBtn = document.getElementById("offers");
  const conceptSpaceBtn = document.getElementById("conceptSpace");
  const menuButton = document.querySelector(".header__menu-button");

  const headerImage = document.getElementById("headerImage");
  const productsNav = document.getElementById("productsNav");
  const offersNav = document.getElementById("offersNav");
  const conceptSpaceNav = document.getElementById("conceptSpaceNav");
  const address = document.querySelector(".address");
  const footer = document.querySelector(".footer-bottom");

  /**
   * Updates the visibility of the second row elements based on the visibility of buttons.
   */
  function updateSecondRowVisibility() {
    if (
      productsBtn.classList.contains("visible") ||
      offersBtn.classList.contains("visible") ||
      conceptSpaceBtn.classList.contains("visible")
    ) {
      headerImage.classList.remove("hidden");
      productsNav.classList.remove("hidden");
      offersNav.classList.remove("hidden");
      conceptSpaceNav.classList.remove("hidden");
    } else {
      headerImage.classList.add("hidden");
      productsNav.classList.add("hidden");
      offersNav.classList.add("hidden");
      conceptSpaceNav.classList.add("hidden");
    }
  }

  /**
   * Updates the transparency class of the navigation elements based on the visibility of buttons.
   */
  function updateTransparentClass() {
    productsNav.classList.toggle(
      "transparent",
      !productsBtn.classList.contains("visible") &&
        (offersBtn.classList.contains("visible") ||
          conceptSpaceBtn.classList.contains("visible"))
    );
    offersNav.classList.toggle(
      "transparent",
      !offersBtn.classList.contains("visible") &&
        (productsBtn.classList.contains("visible") ||
          conceptSpaceBtn.classList.contains("visible"))
    );
    conceptSpaceNav.classList.toggle(
      "transparent",
      !conceptSpaceBtn.classList.contains("visible") &&
        (productsBtn.classList.contains("visible") ||
          offersBtn.classList.contains("visible"))
    );
  }

  /**
   * Toggles the active state of a clicked button and updates the visibility and transparency of related elements.
   * @param {Element} clickedBtn - The button that was clicked.
   * @param {Element} otherBtn1 - Another button to be toggled.
   * @param {Element} otherBtn2 - Another button to be toggled.
   */
  function toggleButtonActive(clickedBtn, otherBtn1, otherBtn2) {
    clickedBtn.classList.toggle("visible");
    if (clickedBtn.classList.contains("visible")) {
      otherBtn1.classList.remove("visible");
      otherBtn2.classList.remove("visible");
    }
    updateSecondRowVisibility();
    updateTransparentClass();
  }

  productsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleButtonActive(productsBtn, offersBtn, conceptSpaceBtn);
  });

  offersBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleButtonActive(offersBtn, productsBtn, conceptSpaceBtn);
  });

  conceptSpaceBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleButtonActive(conceptSpaceBtn, productsBtn, offersBtn);
  });

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth > 1000 &&
      !productsBtn.contains(e.target) &&
      !offersBtn.contains(e.target) &&
      !conceptSpaceBtn.contains(e.target) &&
      !menuButton.contains(e.target)
    ) {
      productsBtn.classList.remove("visible");
      offersBtn.classList.remove("visible");
      conceptSpaceBtn.classList.remove("visible");
      updateSecondRowVisibility();
      updateTransparentClass();
    }
  });

  menuButton.addEventListener("click", () => {
    menuButton.classList.toggle("header__menu-button--active");
    productsNav.classList.toggle("hidden");
    offersNav.classList.toggle("hidden");
    conceptSpaceNav.classList.toggle("hidden");

    if (window.innerWidth < 1000) {
      address.classList.toggle("hidden");
      footer.classList.toggle("hidden");
      headerImage.classList.add("hidden");
    }
  });
};
