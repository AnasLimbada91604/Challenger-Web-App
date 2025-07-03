import React from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";

export function AuthenticationPage() {
  return (
    <div className="auth-split">
      <div className="auth-left">
        <div className="stars">
          {[...Array(20)].map((_, i) => (
            <div className="star" key={i}></div>
          ))}
        </div>
        <img src="/Challenger.svg" alt="Logo" className="auth-logo-img" />
        <div className="auth-title-row">
          <div className="auth-title">CHALLENGER</div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <SignedOut>
            <SignIn routing="path" path="/sign-in" />
            <SignUp routing="path" path="/sign-up" />
          </SignedOut>
          <SignedIn>
            <div className="redirect-message">
              <p>You are already signed in.</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}