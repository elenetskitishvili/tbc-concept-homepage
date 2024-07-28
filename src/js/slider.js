/**
 * Class representing a slider with custom navigation and scrollbar.
 */
class Slider {
  /**
   * Creates an instance of Slider.
   * @param {string} wrapperId - The ID of the slider wrapper element.
   * @param {string} sliderId - The ID of the slider element.
   * @param {string} scrollbarId - The ID of the scrollbar element.
   * @param {string} scrollIndicatorId - The ID of the scroll indicator element.
   * @param {string} prevButtonId - The ID of the previous button element.
   * @param {string} nextButtonId - The ID of the next button element.
   */

  constructor(
    wrapperId,
    sliderId,
    scrollbarId,
    scrollIndicatorId,
    prevButtonId,
    nextButtonId
  ) {
    this.sliderWrapper = document.getElementById(wrapperId);
    this.slider = document.getElementById(sliderId);
    this.scrollIndicator = document.getElementById(scrollIndicatorId);
    this.prevButton = document.getElementById(prevButtonId);
    this.nextButton = document.getElementById(nextButtonId);
    this.scrollbar = document.getElementById(scrollbarId);

    this.currentSlide = 0;
    this.totalSlides = this.slider.children.length;
    this.slidesPerView = this.getSlidesPerView();
    this.maxSlideIndex = Math.max(0, this.totalSlides - this.slidesPerView);
    this.allSlidesVisible = this.totalSlides <= this.slidesPerView;
    this.init();
  }

  getSlidesPerView() {
    const width = window.innerWidth;
    if (width > 1439) return 3;
    if (width <= 1439 && width > 1023) return 2.5;
    if (width <= 1023 && width > 600) return 2.1;
    return 1.2;
  }

  getThumbWidth() {
    const width = window.innerWidth;
    return width <= 600 ? 137 : 300;
  }

  /**
   * Updates the slider's position and the scroll indicator's position.
   */
  updateSlider() {
    const slideWidth = this.slider.children[0].offsetWidth + 30; // Add 30px gap to the slide width
    const transformValue = `translateX(-${slideWidth * this.currentSlide}px)`;

    this.slider.style.transition = "transform 0.3s ease-in-out";
    this.slider.style.transform = transformValue;

    const trackWidth = this.scrollbar.clientWidth - this.getThumbWidth();
    const thumbMovement = (trackWidth / this.maxSlideIndex) * this.currentSlide;
    this.scrollIndicator.style.transform = `translateX(${thumbMovement}px)`;

    this.updateNavButtons();
    this.updateScrollbarVisibility();
  }

  /**
   * Moves the slider to a specific slide.
   * @param {number} index - The index of the slide to move to.
   */
  moveToSlide(index) {
    if (index < 0) {
      this.currentSlide = 0;
    } else if (index > this.maxSlideIndex) {
      this.currentSlide = this.maxSlideIndex;
    } else {
      this.currentSlide = index;
    }
    this.updateSlider();
  }

  /**
   * Updates the state of the navigation buttons based on the current slide.
   */
  updateNavButtons() {
    if (this.allSlidesVisible) {
      if (this.currentSlide === 0) {
        this.prevButton.classList.remove("active");
        this.nextButton.classList.add("active");
      } else {
        this.prevButton.classList.add("active");
        this.nextButton.classList.remove("active");
      }
    } else {
      if (this.currentSlide === 0) {
        this.prevButton.classList.remove("active");
        this.nextButton.classList.add("active");
      } else if (this.currentSlide === this.maxSlideIndex) {
        this.prevButton.classList.add("active");
        this.nextButton.classList.remove("active");
      } else {
        this.prevButton.classList.add("active");
        this.nextButton.classList.add("active");
      }
    }
  }

  /**
   * Updates the visibility of the scrollbar based on the number of slides.
   */
  updateScrollbarVisibility() {
    if (this.allSlidesVisible) {
      this.scrollbar.classList.add("transparent");
      this.scrollIndicator.style.width = "0";
    } else {
      this.scrollbar.classList.remove("transparent");
      this.scrollIndicator.style.width = `${this.getThumbWidth()}px`;
    }
  }

  /**
   * Adds event listeners for navigation buttons, drag events, and window resize.
   */
  addEventListeners() {
    this.prevButton.addEventListener("click", () => {
      if (this.allSlidesVisible) {
        if (this.prevButton.classList.contains("active")) {
          this.prevButton.classList.remove("active");
          this.nextButton.classList.add("active");
        }
      } else {
        this.moveToSlide(this.currentSlide - 1);
      }
    });

    this.nextButton.addEventListener("click", () => {
      if (this.allSlidesVisible) {
        if (this.nextButton.classList.contains("active")) {
          this.nextButton.classList.remove("active");
          this.prevButton.classList.add("active");
        }
      } else {
        this.moveToSlide(this.currentSlide + 1);
      }
    });

    this.prevButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (this.allSlidesVisible) {
        if (this.prevButton.classList.contains("active")) {
          this.prevButton.classList.remove("active");
          this.nextButton.classList.add("active");
        }
      } else {
        this.moveToSlide(this.currentSlide - 1);
      }
    });

    this.nextButton.addEventListener("touchstart", (e) => {
      e.preventDefault();
      if (this.allSlidesVisible) {
        if (this.nextButton.classList.contains("active")) {
          this.nextButton.classList.remove("active");
          this.prevButton.classList.add("active");
        }
      } else {
        this.moveToSlide(this.currentSlide + 1);
      }
    });

    this.sliderWrapper.addEventListener("mousedown", (e) => {
      if (!this.allSlidesVisible) {
        this.isDown = true;
        this.sliderWrapper.style.cursor = "grabbing";
        this.startX = e.pageX - this.sliderWrapper.offsetLeft;
        this.startTranslateX = this.getTranslateX(this.slider);
        this.startScrollIndicatorX = this.getTranslateX(this.scrollIndicator);
        this.slider.style.transition = "none";
        this.scrollIndicator.style.transition = "none";
        e.preventDefault();
      }
    });

    this.sliderWrapper.addEventListener("mouseleave", () => {
      if (this.isDown) {
        this.isDown = false;
        this.sliderWrapper.style.cursor = "grab";
        this.slider.style.transition = "transform 0.3s ease-in-out";
        this.scrollIndicator.style.transition = "transform 0.3s ease-in-out";
        this.snapToSlide();
      }
    });

    this.sliderWrapper.addEventListener("mouseup", () => {
      if (this.isDown) {
        this.isDown = false;
        this.sliderWrapper.style.cursor = "grab";
        this.slider.style.transition = "transform 0.3s ease-in-out";
        this.scrollIndicator.style.transition = "transform 0.3s ease-in-out";
        this.snapToSlide();
      }
    });

    this.sliderWrapper.addEventListener("mousemove", (e) => {
      if (!this.isDown) return;
      e.preventDefault();
      const x = e.pageX - this.sliderWrapper.offsetLeft;
      let walk = x - this.startX;

      if (
        (this.currentSlide === 0 && walk > 0) ||
        (this.currentSlide === this.maxSlideIndex && walk < 0)
      ) {
        walk *= 0.2;
      }

      this.slider.style.transform = `translateX(${
        this.startTranslateX + walk
      }px)`;
      this.scrollIndicator.style.transform = `translateX(${
        this.startScrollIndicatorX - walk / (this.totalSlides - 1)
      }px)`;
    });

    this.sliderWrapper.addEventListener("touchstart", (e) => {
      if (!this.allSlidesVisible) {
        this.startX = e.touches[0].clientX;
        this.startTranslateX = this.getTranslateX(this.slider);
        this.startScrollIndicatorX = this.getTranslateX(this.scrollIndicator);
        this.slider.style.transition = "none";
        this.scrollIndicator.style.transition = "none";
        e.preventDefault();
      }
    });

    this.sliderWrapper.addEventListener("touchmove", (e) => {
      if (!this.allSlidesVisible) {
        const x = e.touches[0].clientX;
        let walk = x - this.startX;

        if (
          (this.currentSlide === 0 && walk > 0) ||
          (this.currentSlide === this.maxSlideIndex && walk < 0)
        ) {
          walk *= 0.2;
        }

        this.slider.style.transform = `translateX(${
          this.startTranslateX + walk
        }px)`;
        this.scrollIndicator.style.transform = `translateX(${
          this.startScrollIndicatorX - walk / (this.totalSlides - 1)
        }px)`;
      }
    });

    this.sliderWrapper.addEventListener("touchend", () => {
      if (!this.allSlidesVisible) {
        this.slider.style.transition = "transform 0.3s ease-in-out";
        this.scrollIndicator.style.transition = "transform 0.3s ease-in-out";
        this.snapToSlide();
      }
    });

    window.addEventListener("resize", () => {
      this.slidesPerView = this.getSlidesPerView();
      this.maxSlideIndex = Math.max(0, this.totalSlides - this.slidesPerView);
      this.allSlidesVisible = this.totalSlides <= this.slidesPerView;
      this.updateSlider();
      if (this.allSlidesVisible) {
        this.sliderWrapper.style.cursor = "default";
        this.removeDraggingEventListeners();
      } else {
        this.sliderWrapper.style.cursor = "grab";
        this.addDraggingEventListeners();
      }
    });
  }

  /**
   * Gets the current translateX value of an element.
   * @param {Element} element - The element to get the translateX value from.
   * @returns {number} - The translateX value.
   */
  getTranslateX(element) {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m41;
  }

  /**
   * Snaps the slider to the nearest slide based on the current transform value.
   */
  snapToSlide() {
    const currentTransform = this.getTranslateX(this.slider);
    const slideWidth = this.slider.children[0].offsetWidth + 30; // Add 30px gap to the slide width
    const moveSlide = Math.round(-currentTransform / slideWidth);

    if (moveSlide < 0) {
      this.moveToSlide(0);
    } else if (moveSlide > this.maxSlideIndex) {
      this.moveToSlide(this.maxSlideIndex);
    } else {
      this.moveToSlide(moveSlide);
    }
  }

  /**
   * Removes the dragging event listeners from the slider wrapper.
   */
  removeDraggingEventListeners() {
    this.sliderWrapper.removeEventListener("mousedown", this.onMouseDown);
    this.sliderWrapper.removeEventListener("mouseleave", this.onMouseLeave);
    this.sliderWrapper.removeEventListener("mouseup", this.onMouseUp);
    this.sliderWrapper.removeEventListener("mousemove", this.onMouseMove);
    this.sliderWrapper.removeEventListener("touchstart", this.onTouchStart);
    this.sliderWrapper.removeEventListener("touchmove", this.onTouchMove);
    this.sliderWrapper.removeEventListener("touchend", this.onTouchEnd);
  }

  /**
   * Adds the dragging event listeners to the slider wrapper.
   */
  addDraggingEventListeners() {
    this.sliderWrapper.addEventListener("mousedown", this.onMouseDown);
    this.sliderWrapper.addEventListener("mouseleave", this.onMouseLeave);
    this.sliderWrapper.addEventListener("mouseup", this.onMouseUp);
    this.sliderWrapper.addEventListener("mousemove", this.onMouseMove);
    this.sliderWrapper.addEventListener("touchstart", this.onTouchStart);
    this.sliderWrapper.addEventListener("touchmove", this.onTouchMove);
    this.sliderWrapper.addEventListener("touchend", this.onTouchEnd);
  }

  /**
   * Initializes the slider by updating its state and adding event listeners.
   */
  init() {
    this.updateSlider();
    this.addEventListeners();
  }
}

export default Slider;
