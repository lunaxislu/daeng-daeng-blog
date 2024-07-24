import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Input from "./Input";
import jwt from "jsonwebtoken";

const schema = z
  .object({
    email: z.string().email("이메일 쓰세요"),
    password: z.string().min(6, "최소6글자"),
    passwordConfirm: z.string().min(6, "비번이 틀렸어요"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "비번이 맞지않습니다.",
        path: ["password"],
      });
      ctx.addIssue({
        code: "custom",
        message: "비번이 맞지않습니다.",
        path: ["passwordConfirm"],
      });
    }
  });

type Schema = z.infer<typeof schema>;
const WithZustand = () => {
  const method = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const submitEvent = async (values: Schema) => {
    const { data } = await axios.post("/api/token/handler", values);
    console.log(data);
  };
  return (
    <FormProvider {...method}>
      <form onSubmit={method.handleSubmit(submitEvent)}>
        <Input
          control={method.control}
          name="email"
          placeholder="email입력바람"
        />
        <Input
          control={method.control}
          name="password"
          placeholder="비번입력"
        />
        <Input
          control={method.control}
          name="passwordConfirm"
          placeholder="비번확인"
        />
        <button type="submit">버튼</button>
      </form>
    </FormProvider>
  );
};

export default WithZustand;
