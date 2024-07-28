/**
 * Initializes a custom scrollbar for a specific content area. Creates and manages the
 * scrollbar track and thumb, and synchronizes their positions with the content scroll.
 */

export const initializeCustomScrollbar = () => {
  const content = document.querySelector(".scrollbar__content");
  const scrollbarTrack = document.createElement("div");
  const scrollbarThumb = document.createElement("div");

  scrollbarTrack.classList.add("scrollbar__track");
  scrollbarThumb.classList.add("scrollbar__thumb");

  document.body.appendChild(scrollbarTrack);
  scrollbarTrack.appendChild(scrollbarThumb);

  let scrollTimeout;

  /**
   * Updates the position and size of the scrollbar thumb based on the content scroll position.
   */
  const updateThumbPosition = () => {
    const contentHeight = content.scrollHeight;
    const viewportHeight = content.clientHeight;
    const scrollRatio = viewportHeight / contentHeight;
    const thumbHeight = Math.max(viewportHeight * scrollRatio, 20);
    const scrollTop = content.scrollTop;
    const trackHeight = scrollbarTrack.clientHeight;
    const thumbPosition = (scrollTop * trackHeight) / contentHeight;

    scrollbarThumb.style.height = `${thumbHeight}px`;
    scrollbarThumb.style.transform = `translateY(${thumbPosition}px)`;
  };

  /**
   * Starts dragging the scrollbar thumb to manually scroll the content.
   * @param {MouseEvent} event - The mousedown event triggering the drag.
   */
  const startDragging = (event) => {
    const initialY = event.clientY;
    const initialScrollTop = content.scrollTop;
    const trackHeight = scrollbarTrack.clientHeight;
    const contentHeight = content.scrollHeight;

    /**
     * Handles the mousemove event during dragging.
     * @param {MouseEvent} event - The mousemove event.
     */
    const onMouseMove = (event) => {
      const deltaY = event.clientY - initialY;
      const scrollDelta = (deltaY * contentHeight) / trackHeight;
      content.scrollTop = initialScrollTop + scrollDelta;
    };

    /**
     * Handles the mouseup event to stop dragging.
     */
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  /**
   * Shows the custom scrollbar temporarily.
   */
  const showScrollbar = () => {
    clearTimeout(scrollTimeout);
    document.body.classList.add("scrollbar--visible");
    scrollTimeout = setTimeout(() => {
      document.body.classList.remove("scrollbar--visible");
    }, 1000);
  };

  scrollbarThumb.addEventListener("mousedown", startDragging);
  content.addEventListener("scroll", () => {
    updateThumbPosition();
    showScrollbar();
  });

  scrollbarTrack.addEventListener("mouseenter", showScrollbar);
  scrollbarTrack.addEventListener("mouseleave", () => {
    clearTimeout(scrollTimeout);
    document.body.classList.remove("scrollbar--visible");
  });

  updateThumbPosition();
  window.addEventListener("resize", updateThumbPosition);
};
