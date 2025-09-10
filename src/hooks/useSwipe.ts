// src/hooks/useSwipe.ts
import { useState, TouchEvent } from "react";

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // a minimum swipe distance is required to be detected
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // otherwise the swipe is fired even with a single touch
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      input.onSwipedLeft();
    }
    if (isRightSwipe) {
      input.onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
