import { useEffect, useRef } from 'react';

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function useDialogFocus(isOpen) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return undefined;

    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const background = [];

    // Isolate the dialog without making any of its ancestors inert.
    for (let current = dialog; current.parentElement; current = current.parentElement) {
      for (const sibling of current.parentElement.children) {
        if (sibling !== current && sibling instanceof HTMLElement) {
          background.push([sibling, sibling.inert]);
          sibling.inert = true;
        }
      }
      if (current.parentElement === document.body) break;
    }

    const controls = () => Array.from(dialog.querySelectorAll(focusableSelector))
      .filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
    const focusFirst = () => (controls()[0] || dialog).focus({ preventScroll: true });
    const handleFocus = (event) => {
      if (!dialog.contains(event.target)) focusFirst();
    };
    const handleKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const elements = controls();
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);
    focusFirst();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
      document.body.style.overflow = previousOverflow;
      background.forEach(([element, wasInert]) => { element.inert = wasInert; });
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return dialogRef;
}
