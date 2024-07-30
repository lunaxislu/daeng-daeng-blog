import SignIn from "@/components/auth/nextAuth/SignIn";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSidePropsContext } from "next";

const AuthNextAuth = () => {
  return <SignIn />;
};

export default AuthNextAuth;

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const session = getServerSession(ctx.req, ctx.res, authOptions);

//   return { props: { session: session } };
// };
