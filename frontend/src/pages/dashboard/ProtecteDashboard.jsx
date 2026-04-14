import React, { useEffect } from "react";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";

export default function ProtecteDashboard({ children, islogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (islogged.status === 201) {
      navigate("/auth/login");
    }
  }, [islogged.status, navigate]);

  if (islogged.status === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (islogged.status === 200) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
