import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../withZustand/Input";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type Schema = z.infer<typeof schema>;
const SignIn = () => {
  const method = useForm<Schema>({
    defaultValues: {
      email: "testtest@gmail.com",
      password: "123456",
    },
    resolver: zodResolver(schema),
  });
  const handleSubmit = async (value: Schema) => {
    const result = await signIn("HTTLogin", {
      ...value,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={method.handleSubmit(handleSubmit)}>
        <Input control={method.control} name="email" placeholder="email" />
        <Input
          control={method.control}
          name="password"
          placeholder="password"
        />
        <button type="submit">submit</button>
      </form>

      <button type="button" onClick={() => signOut()}>
        로그아웃
      </button>
    </div>
  );
};

export default SignIn;
