/**
 * Initializes the cookie popup functionality. If cookies have not been accepted,
 * the popup will be displayed. When the accept button is clicked, it will save
 * the acceptance in localStorage and hide the popup.
 */
export const initializeCookiePopup = () => {
  const popup = document.getElementById("cookie-popup");
  const acceptButton = document.getElementById("cookie-popup-accept");

  if (!localStorage.getItem("cookiesAccepted")) {
    popup.style.display = "flex";
  }

  acceptButton.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    popup.style.display = "none";
  });
};
