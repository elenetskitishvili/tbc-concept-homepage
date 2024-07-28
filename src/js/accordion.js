/**
 * Initializes the accordion functionality. Adds click event listeners to all accordion headers
 * and manages the active state and content visibility of the accordion items.
 */
export const initializeAccordion = () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const activeHeader = document.querySelector(".accordion__header--active");
      if (activeHeader && activeHeader !== header) {
        toggleAccordion(activeHeader, false);
      }

      const isActive = header.classList.contains("accordion__header--active");
      toggleAccordion(header, !isActive);
    });
  });

  function toggleAccordion(header, isActive) {
    const content = header.nextElementSibling;
    const arrow = header.querySelector(".accordion-arrow");

    if (isActive) {
      header.classList.add("accordion__header--active");
      arrow.classList.add("accordion__arrow--active");
      content.style.height = content.scrollHeight + "px";
    } else {
      header.classList.remove("accordion__header--active");
      arrow.classList.remove("accordion__arrow--active");
      content.style.height = "0px";
    }
  }
};
