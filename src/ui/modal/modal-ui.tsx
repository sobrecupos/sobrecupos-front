import { getComponentClassNames } from "@marketplace/ui/namespace";
import { X as XIcon } from "lucide-react";
import classNames from "classnames";
import {
  MouseEvent,
  PropsWithChildren,
  TransitionEvent,
  useEffect,
  useState,
} from "react";

const classes = getComponentClassNames("modal", {
  content: "content",
  title: "title",
  close: "close",
  contentHead: "content-head",
  contentBody: "content-body",
  contentFooter: "content-footer",
});

const isClosingTransitionEnd = (event: TransitionEvent) =>
  event.propertyName === "transform" &&
  event.currentTarget.classList.contains(`${classes.namespace}--closed`);

export type ModalUIVariants = "fullscreen" | "small";

export type ModalUIProps = PropsWithChildren<{
  closeOnBackdropClick?: boolean;
  className?: string;
  footer?: JSX.Element | string;
  onClose: () => void;
  showCloseButton?: boolean;
  title?: JSX.Element | string;
  variant?: ModalUIVariants;
}>;

export const ModalUI = ({
  children,
  className,
  closeOnBackdropClick,
  footer,
  onClose,
  title,
  showCloseButton = false,
  variant = "fullscreen",
}: ModalUIProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const showHeader = title || showCloseButton;

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (event: MouseEvent) => {
    event.stopPropagation();

    if (closeOnBackdropClick) {
      closeModal();
    }
  };

  const handleModalClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  const handleTransitionEnd = (event: TransitionEvent) => {
    event.stopPropagation();

    if (isClosingTransitionEnd(event)) {
      requestAnimationFrame(onClose);
    }
  };

  useEffect(() => {
    const keyCloseModal = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", keyCloseModal);

    return () => {
      window.removeEventListener("keydown", keyCloseModal);
    };
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return (
    <div
      className={classNames(
        classes.namespace,
        `${classes.namespace}--${isOpen ? "open" : "closed"}`,
        className
      )}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleBackdropClick}
      data-testid="modal-ui-backdrop"
    >
      <div
        className={classNames(
          classes.content,
          `${classes.content}--${variant}`
        )}
        onClick={handleModalClick}
      >
        {showHeader ? (
          <div
            className={classNames(classes.contentHead, {
              [`${classes.contentHead}--title`]: title,
            })}
          >
            {title ? <div className={classes.title}>{title}</div> : null}
            {showCloseButton ? (
              <button
                className={classes.close}
                color="neutral-50"
                onClick={closeModal}
                type="button"
              >
                <XIcon />
              </button>
            ) : null}
          </div>
        ) : null}

        <div className={classes.contentBody}>{children}</div>

        {footer ? <div className={classes.contentFooter}>{footer}</div> : null}
      </div>
    </div>
  );
};
