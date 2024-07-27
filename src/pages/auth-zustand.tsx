import SignUp from "@/components/auth/withZustand/sign-up/SignUp";
import React from "react";

const AuthZustand = () => {
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <SignUp />
    </div>
  );
};

export default AuthZustand;
