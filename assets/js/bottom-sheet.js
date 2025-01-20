(() => {
  const showModalBtn = document.querySelector(".show-modal");
  const bottomSheet = document.querySelector(".bottom-sheet");
  const sheetOverlay = bottomSheet.querySelector(".sheet-overlay");
  const sheetContent = bottomSheet.querySelector(".content");
  const dragIcon = bottomSheet.querySelector(".drag-icon");

  let isDragging = false, startY, startHeight;

  const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(80);
  };

  const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
  };

  const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`;
    bottomSheet.classList.toggle("fullscreen", height === 100);
  };

  const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
  };

  const dragging = (e) => {
    if (!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
  };

  const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    const thresholds = [
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100];
    let targetHeight = thresholds[thresholds.length - 1];
    for (let i = 0; i < thresholds.length; i++) {
      if (sheetHeight < thresholds[i]) {
        targetHeight = i === 0 ? 0 : thresholds[i - 1];
        break;
      }
    }
    sheetHeight < 25 ? hideBottomSheet() : updateSheetHeight(targetHeight);
  };

  const addDragEvents = (target) => {
    target.addEventListener("mousedown", dragStart);
    target.addEventListener("touchstart", dragStart);
  };

  const addMoveEvents = (target) => {
    target.addEventListener("mousemove", dragging);
    target.addEventListener("touchmove", dragging);
  };

  const addEndEvents = (target) => {
    target.addEventListener("mouseup", dragStop);
    target.addEventListener("touchend", dragStop);
  };

  addDragEvents(dragIcon);
  addMoveEvents(document);
  addEndEvents(document);

  sheetOverlay.addEventListener("click", hideBottomSheet);
  showModalBtn.addEventListener("click", showBottomSheet);
})();
