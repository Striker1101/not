import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function ProtecteAdmin({ children, islogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (islogged.status === 201) {
      navigate("/auth/login");
    } else if (islogged.status === 200) {
      const isAdmin = islogged.userData?.users?.[0]?.role === "admin" || islogged.user?.uid === "YvAAxZB4rXOr9pZM5XgYNBjLyO53";
      if (!isAdmin) {
        navigate("/dashboard");
      }
    }
  }, [islogged.status, islogged.user?.uid, islogged.userData?.users, navigate]);

  if (islogged.status === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const isAdmin = islogged.userData?.users?.[0]?.role === "admin" || islogged.user?.uid === "YvAAxZB4rXOr9pZM5XgYNBjLyO53";

  if (islogged.status === 200 && isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
