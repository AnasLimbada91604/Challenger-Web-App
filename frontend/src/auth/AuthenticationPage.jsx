import React, { useEffect } from "react";
import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

export function AuthenticationPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('Auth state changed:', { isSignedIn, isLoaded, pathname: location.pathname });
    if (isLoaded && isSignedIn) {
      console.log('User is signed in, redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    }
  }, [isSignedIn, isLoaded, navigate, location.pathname]);

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
              <p>Redirecting to dashboard...</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}