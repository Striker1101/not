import React from "react";
import Spinner from "../../components/Spinner";

export default function ProtecteAdmin({ children, islogged }) {
  if (islogged.status === 201) {
    window.location.href = "/auth/login";
  }
  console.log(islogged.user.uid);
  if (islogged.user.uid !== "YvAAxZB4rXOr9pZM5XgYNBjLyO53") {
    return (window.location.href = "/notfound");
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
