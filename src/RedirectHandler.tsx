import { useEffect } from "react";
import { useNavigate } from "react-router";

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get("redirect");

    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, []);

  return null;
}

export default RedirectHandler;