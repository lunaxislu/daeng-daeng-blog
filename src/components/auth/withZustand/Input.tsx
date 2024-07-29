import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface Input_Props<
  TField extends FieldValues,
  TName extends FieldPath<TField>,
> {
  control: Control<TField>;
  name: TName;
  placeholder: string;
}
const Input = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  placeholder,
  ...props
}: Input_Props<T, N>) => {
  const method = useController({ control, name });

  return (
    <div>
      <input
        {...method.field}
        placeholder={placeholder}
        style={{ borderBottom: "1px solid black", color: "black" }}
      />
      {method.fieldState.error && <div>{method.fieldState.error.message}</div>}
    </div>
  );
};

export default Input;
