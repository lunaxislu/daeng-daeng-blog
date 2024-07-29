import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect } from "react";

const Cookie = ({ cookie }: { cookie: { [key: string]: string } }) => {
  console.log(cookie);
  useEffect(() => {
    //console.log(document.cookie); // 기본적으로 ssg이므로 서버측에서 부터 렌더링 하기에, document값 자체를 읽지 못한다.
  }, []);
  return <div></div>;
};

export default Cookie;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { cookies } = ctx.req;
  console.log("🚀 ~ getServerSideProps ~ cookies:", cookies);

  return { props: { cookie: cookies } };
};
