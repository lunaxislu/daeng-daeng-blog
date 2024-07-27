import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z
  .object({
    email: z
      .string()
      .email("이메일 쓰세요")
      .refine(
        (val) => {
          console.log(val);
          val.length;
        },
        {
          message: "aisdjf",
        },
      ),
    password: z.string().min(6, "최소6글자"),
    passwordConfirm: z.string().min(6, "비번이 틀렸어요"),
    test: z.literal("hello world"),
  })
  .superRefine(({ password, passwordConfirm, test }, ctx) => {
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
    console.log(test);
    ctx.addIssue({
      code: "invalid_literal",
      expected: "hello world",
      received: test,
      message: "hello world임니다.",
      path: ["test"],
    });
  });
const Zod = () => {
  const method = useForm({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    const result = schema.safeParse({
      email: "testgmail.com",
      password: "123456",
      passwordConfirm: "123456",
    });
    console.log(result);
  }, []);
  const handle = (values: z.infer<typeof schema>) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return <div></div>;
};

export default Zod;
