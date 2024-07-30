import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Input";
import axios from "axios";
import { setAuthInSession } from "../hook/useAuthState";
import { useRouter } from "next/router";
import withAuth from "../withAuth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
interface PAuth {
  id: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
}
type Schema = z.infer<typeof schema>;
const SingIn = () => {
  const router = useRouter();
  const method = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const submitHandle = async (value: Schema) => {
    const { data } = await axios.get<PAuth[]>("http://localhost:4000/users");
    const result = data[0];
    if (!result.token) throw new Error("토큰 없는 아이디가 말이 되냐");
    if (result) {
      setAuthInSession({
        email: result.email,
        token: result.token,
        isLogin: true,
      });
      document.cookie = `token=${result.token};`;
      // router.push("/");
    }
  };
  return (
    <div>
      <form onSubmit={method.handleSubmit(submitHandle)}>
        <Input control={method.control} name="email" placeholder="아이디" />
        <Input control={method.control} name="password" placeholder="비번" />
        <button type="submit">join us</button>
      </form>
    </div>
  );
};

export default SingIn;
