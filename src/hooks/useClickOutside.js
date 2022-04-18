import { useEffect } from "react";

function useClickOutside(ref, closeCallback = () => null) {
  const handleClose = (e) => {
    if (!ref.current.contains(e.target)) {
      closeCallback();
      console.log("Log ::: closeCallBack :::", closeCallback);
      console.log("Log ::: `չի պարունակում` :::", `չի պարունակում`);
    }
  };

  useEffect(() => {
    if (ref.current) {
      window.addEventListener("click", handleClose);
      console.log("Log ::: ref :::", ref);
    }

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [ref]);
}

export default useClickOutside;
