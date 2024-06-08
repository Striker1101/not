import React from "react";
import Spinner from "../../components/Spinner";

export default function ProtecteAdmin({ children, islogged }) {
  if (islogged.status === 201) {
    window.location.href = "/auth/login";
  }
  if (islogged.user.uid === "YvAAxZB4rXOr9pZM5XgYNBjLyO53") {
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
}
