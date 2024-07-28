import SingIn from "@/components/auth/withZustand/sign-in/SingIn";
import SignUp from "@/components/auth/withZustand/sign-up/SignUp";
import withAuth from "@/components/auth/withZustand/withAuth";

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
