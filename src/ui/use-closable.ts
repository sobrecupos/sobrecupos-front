import {
  MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

const CLICK_EVENT = "click";

export type UseClosable = {
  defaultIsOpen?: boolean;
  closeOnOutsideClick?: boolean;
};

export const useClosable = <T extends HTMLElement>({
  defaultIsOpen = false,
  closeOnOutsideClick = true,
}: UseClosable = {}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const container = useRef<T>(null);

  const toggleOpen = (event: ReactMouseEvent) => {
    event.stopPropagation();
    setIsOpen((open) => !open);
  };

  useEffect(() => {
    if (!closeOnOutsideClick) return;

    const isContainerOrInner = (target: EventTarget | null) =>
      target instanceof Node &&
      (target === container.current || container.current?.contains(target));

    const handleClick = (event: MouseEvent) => {
      if (!isContainerOrInner(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener(CLICK_EVENT, handleClick);
    }

    return () => document.removeEventListener(CLICK_EVENT, handleClick);
  }, [isOpen, closeOnOutsideClick]);

  return {
    isOpen,
    setIsOpen,
    toggleOpen,
    container,
  };
};
