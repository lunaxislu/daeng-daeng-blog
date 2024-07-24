import React from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface Input_Props<
  TField extends FieldValues,
  TName extends FieldPath<TField>
> {
  control: Control<TField>;
  name: TName;
  placeholder: string;
}
const Input = <T extends FieldValues, N extends FieldPath<T>>({
  control,
  name,
  placeholder,
}: Input_Props<T, N>) => {
  const method = useController({ control, name });

  return (
    <div>
      <input {...method.field} placeholder={placeholder} />
      {method.fieldState.error && <div>{method.fieldState.error.message}</div>}
    </div>
  );
};

export default Input;
