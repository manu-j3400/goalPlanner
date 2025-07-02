import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getProfile } from "../services/auth";

const AuthCallback = ({
  onAuthSuccess,
}: {
  onAuthSuccess: (user: any, token: string) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      getProfile(token)
        .then((user) => {
          onAuthSuccess(user, token);
          navigate("/");
        })
        .catch(() => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [location, navigate, onAuthSuccess]);

  return <div>Signing you in...</div>;
};

export default AuthCallback;
