import SingIn from "@/components/auth/withZustand/sign-in/SingIn";
import SignUp from "@/components/auth/withZustand/sign-up/SignUp";
import HocPatternWithAuth from "@/components/auth/withZustand/HocPatternWithAuth";

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

      <SingIn />
    </div>
  );
};

export default AuthZustand;
