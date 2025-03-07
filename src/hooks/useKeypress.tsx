import { useEffect } from 'react';


export const useKeypress = (key: string, action: () => void) => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault();
        action()
      }
    }

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    }

    window.addEventListener('keyup', onKeyup);
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keyup', onKeyup);
      window.removeEventListener('keydown', onKeydown);
    }
  }, []);
}

export default useKeypress;
