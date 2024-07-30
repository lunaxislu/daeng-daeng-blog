import axios, { AxiosError, AxiosResponse } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { decode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";

interface IAuth {
  email: string;
  password: string;
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "HTTLogin",
      type: "credentials",
      name: "CredentialsLogin",

      credentials: {},
      // credentials: {
      //   email: { label: "email", value: "", type: "text" },
      //   password: { type: "password" },
      //   passwordCheck: {},
      // },

      async authorize(credentials, req) {
        const { email, password } = credentials as IAuth;
        try {
          const { data } = await axios<IAuth, AxiosResponse>(
            "http://localhost:4000/users",
          );

          return data[0];
        } catch (err) {
          if (err instanceof AxiosError) {
            throw new Error(JSON.stringify(err.response?.data));
          }
          return null;
        }
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    // //무언가 데이터를 넘겨주고 싶으면 jwt 토큰에 데이터를 유지하고 session 에서 처리해줘야함
    async jwt({ token, user, session, trigger }) {
      const payloadExpires = await decode({
        secret: "secret",
        token: token.accessToken,
      });
      // user라는 객체는 authorize에서 return 해준 값이다.
      if (user) {
        token.role = "user";
        token.accessToken = user.token;
      }
      const expiresIn = 5 * 24 * 60 * 60; // 5 days in seconds
      const expirationDate = Math.floor(Date.now() / 1000) + expiresIn;
      token.exp = expirationDate;
      return token;
    },

    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
      // const expiresIn = 5 * 24 * 60 * 60;
      // session.expires = new Date(expiresIn * 1000).toISOString();

      return session;
    },
  },
  session: {
    maxAge: 5 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth-nextAuth", // default로 생성된 로그인 page를 overriding 할 수 있다. https://next-auth.js.org/configuration/pages
  },

  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;
export default NextAuth(authOptions);
