const WHEEL_THRESHOLD = 50;
const SCROLL_END_FALLBACK_MS = 700;

function getSections(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(':scope > section'));
}

function getSectionScrollLeft(container: HTMLElement, index: number): number {
  return index * container.clientWidth;
}

function getActiveSectionIndex(container: HTMLElement, sectionCount: number): number {
  if (sectionCount === 0) {
    return 0;
  }

  const panelWidth = container.clientWidth;
  if (panelWidth <= 0) {
    return 0;
  }

  return Math.min(
    sectionCount - 1,
    Math.max(0, Math.round(container.scrollLeft / panelWidth)),
  );
}

function getVerticalScrollable(
  target: EventTarget | null,
  section: HTMLElement,
): HTMLElement | null {
  let element = target instanceof HTMLElement ? target : null;

  while (element && section.contains(element)) {
    if (element === section) {
      return element.scrollHeight > element.clientHeight + 1 ? element : null;
    }

    const { overflowY } = window.getComputedStyle(element);
    const canScroll =
      (overflowY === 'auto' || overflowY === 'scroll') &&
      element.scrollHeight > element.clientHeight + 1;

    if (canScroll) {
      return element;
    }

    element = element.parentElement;
  }

  return section.scrollHeight > section.clientHeight + 1 ? section : null;
}

function canScrollVertically(
  scrollable: HTMLElement,
  direction: 'up' | 'down',
): boolean {
  const atTop = scrollable.scrollTop <= 0;
  const atBottom =
    scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;

  if (direction === 'up') {
    return !atBottom;
  }

  return !atTop;
}

/** Wire wheel → horizontal section changes. Returns cleanup for useEffect. */
export function attachHorizontalSectionWheel(container: HTMLElement): () => void {
  let isAnimating = false;
  let accumulatedDelta = 0;
  let lockedIndex: number | null = null;
  let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

  const finishScroll = () => {
    isAnimating = false;
    lockedIndex = null;
    container.style.scrollSnapType = '';
  };

  const scrollToSection = (index: number) => {
    const sections = getSections(container);
    const targetLeft = getSectionScrollLeft(container, index);

    if (
      sections.length === 0 ||
      index < 0 ||
      index >= sections.length ||
      Math.abs(container.scrollLeft - targetLeft) < 2
    ) {
      return;
    }

    isAnimating = true;
    lockedIndex = index;
    accumulatedDelta = 0;

    container.style.scrollSnapType = 'none';
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });

    clearTimeout(scrollEndTimer);

    const onScrollEnd = () => {
      container.removeEventListener('scrollend', onScrollEnd);
      clearTimeout(scrollEndTimer);
      finishScroll();
    };

    if ('onscrollend' in container) {
      container.addEventListener('scrollend', onScrollEnd, { once: true });
      scrollEndTimer = setTimeout(() => {
        container.removeEventListener('scrollend', onScrollEnd);
        finishScroll();
      }, SCROLL_END_FALLBACK_MS);
    } else {
      scrollEndTimer = setTimeout(finishScroll, SCROLL_END_FALLBACK_MS);
    }
  };

  const onWheel = (event: WheelEvent) => {
    const sections = getSections(container);
    if (sections.length === 0) {
      return;
    }

    const activeIndex = lockedIndex ?? getActiveSectionIndex(container, sections.length);
    const activeSection = sections[activeIndex];
    const scrollable = getVerticalScrollable(event.target, activeSection);

    if (scrollable) {
      const innerDirection = event.deltaY < 0 ? 'up' : 'down';
      if (canScrollVertically(scrollable, innerDirection)) {
        return;
      }
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    if (isAnimating) {
      event.preventDefault();
      return;
    }

    accumulatedDelta += event.deltaY;

    if (Math.abs(accumulatedDelta) < WHEEL_THRESHOLD) {
      return;
    }

    event.preventDefault();

    if (accumulatedDelta < 0) {
      if (activeIndex < sections.length - 1) {
        scrollToSection(activeIndex + 1);
      } else {
        accumulatedDelta = 0;
      }
      return;
    }

    if (activeIndex > 0) {
      scrollToSection(activeIndex - 1);
    } else {
      accumulatedDelta = 0;
    }
  };

  container.addEventListener('wheel', onWheel, { passive: false });

  return () => {
    container.removeEventListener('wheel', onWheel);
    clearTimeout(scrollEndTimer);
    finishScroll();
  };
}
