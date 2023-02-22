import { useEffect, useRef } from "react";
const useFixed = (styles, haveData) => {
  const menuRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!menuRef.current || !contentRef.current) return;
    const newMenuRef = { ...menuRef };
    const newContentRef = { ...contentRef };
    const handleScroll = (offsetTop, menuHeight) => {
      if (window.scrollY + menuHeight > offsetTop) {
        newMenuRef.current.classList.add(`${styles["fixed-menu"]}`);
        newContentRef.current.classList.add(`${styles["margin-fixed"]}`);
      } else {
        newMenuRef.current.classList.remove(`${styles["fixed-menu"]}`);
        newContentRef.current.classList.remove(`${styles["margin-fixed"]}`);
      }
    };
    const offsetTop = newMenuRef.current.offsetTop;
    const { clientHeight } = document.querySelector(".menu");
    const handleFunction = () => {
      handleScroll(offsetTop, clientHeight);
    };
    window.addEventListener("scroll", handleFunction);
    return () => {
      window.removeEventListener("scroll", handleFunction);
    };
  }, [haveData, styles]);

  return { menuRef, contentRef };
};
export default useFixed;
