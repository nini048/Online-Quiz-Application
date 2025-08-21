// usePrompt.js
import { useEffect } from "react";

export const usePrompt = (message, when) => {
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message;
    };

    const handlePopState = (e) => {
      const confirmLeave = window.confirm(message);
      if (!confirmLeave) {
        window.history.pushState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // Đẩy state để browser ghi nhận vị trí hiện tại
    window.history.pushState(null, "", window.location.pathname);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [when, message]);
};
