import { useEffect } from "react";

const useActivateAnimation = (selector) => {
  useEffect(() => {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add('animate-in');
    }
  }, [selector]);
};

export default useActivateAnimation;