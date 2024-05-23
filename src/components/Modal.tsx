import React, { useEffect, useState } from "react";

import { FaWindowClose } from "react-icons/fa";
import ReactDOM from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
  show: boolean;
  onClose?: () => void;
}

export const Modal = ({ children, show, onClose }: ModalProps) => {
  const [render, setRender] = useState<boolean>(show);

  useEffect(() => {
    setRender(show);
  }, [show]);

  const hide = () => {
    setRender(false);
    onClose && onClose();
  };

  if (!render) return null;

  return ReactDOM.createPortal(
    <div className="bg-[rgba(0,0,0,.4)] flex fixed top-0 left-0 justify-center items-center w-full h-full overflow-auto">
      <div className="shadow-md animate-scaleUp bg-gray-50 min-w-[90%] md:min-w-[400px] min-h-[100px] rounded-xl">
        <div className="bg-gray-100 flex justify-end p-2 rounded-t-xl">
          <button onClick={hide}>
            <FaWindowClose size={18} className="text-red-500" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
