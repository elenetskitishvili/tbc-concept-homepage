import { initializeCustomScrollbar } from './scrollbar.js';
import { initializeAccordion } from './accordion.js';
import { initializeButtonToggle } from './buttonToggle.js';
import { handleLanguageSwitch } from './languageSwitcher.js';
import { handleMenuToggle } from './header.js';
import Slider from './slider.js';
import { initializeCookiePopup } from './cookie.js';

let lastWidth = window.innerWidth;

/**
 * Checks the window size and reloads the page if the window crosses the 1001px width threshold.
 */
const checkWindowSize = () => {
  let currentWidth = window.innerWidth;
  if (
    (lastWidth < 1001 && currentWidth >= 1001) ||
    (lastWidth >= 1001 && currentWidth < 1001)
  ) {
    location.reload();
  }
  lastWidth = currentWidth;
};
window.addEventListener('resize', checkWindowSize);

/**
 * Sets the text content of .current-year elements to the current year.
 */
const setCurrentYear = () => {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initializeCustomScrollbar();
  initializeAccordion();
  initializeButtonToggle();
  handleLanguageSwitch();
  handleMenuToggle();
  initializeCookiePopup();
  setCurrentYear();

  new Slider(
    'sliderWrapper1',
    'slider1',
    'scrollbar1',
    'scrollIndicator1',
    'prevButton1',
    'nextButton1'
  );
  new Slider(
    'sliderWrapper2',
    'slider2',
    'scrollbar2',
    'scrollIndicator2',
    'prevButton2',
    'nextButton2'
  );
  new Slider(
    'sliderWrapper3',
    'slider3',
    'scrollbar3',
    'scrollIndicator3',
    'prevButton3',
    'nextButton3'
  );
});
