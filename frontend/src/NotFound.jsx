import React from "react";
import Error from "./resources/images/error-illus.png";
export default function NotFound() {
  return (
    <section className="error-section pt-120 pb-120">
      <div className="overlay pt-120 pb-120">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              <div className="img-area">
                <img src={Error} alt="error" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="section-text">
                <h2 className="title">Page not found</h2>
                <p>Oops.. Looks like you got lost :</p>
              </div>
              <div className="btn-border">
                <a href="/" className="cmn-btn">
                  Go Back Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
