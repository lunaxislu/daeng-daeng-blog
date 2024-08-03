import { getBase64 } from "@/util/base64";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const Binary = () => {
  const method = useForm();
  // const submitFormidable = async (value: FieldValues) => {
  //   const _file = value.file[0];
  //   const result = await axios.postForm("/api/binary/formidable", {
  //     ...value,
  //     file: _file,
  //   });
  //   console.log(result);
  // };
  const submitBase64 = async (value: FieldValues) => {
    const _file = await getBase64(value.file[0]);
    try {
      const result = await axios.post("/api/binary/base64", {
        ...value,
        file: _file,
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={method.handleSubmit(submitBase64)}>
      <input type="text" {...method.register("text")} />
      <input type="file" {...method.register("file")} />
      <button type="submit">제출</button>
    </form>
  );
};

export default Binary;
