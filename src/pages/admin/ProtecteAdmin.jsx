import React from "react";
import Spinner from "../../components/Spinner";

export default function ProtecteAdmin({ children, islogged }) {
  if (islogged.status === 201) {
    window.location.href = "/auth/login";
  }
  return (
    <div>
      {islogged === undefined || islogged === false ? (
        <Spinner />
      ) : islogged.status === 200 ? (
        children
      ) : (
        <Spinner />
      )}
    </div>
  );
}
